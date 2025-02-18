/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

use std::cell::RefCell;

use crate::{
    bindings::exports::component::aws_wasm_checksums::crc32c_hasher::{
        Guest as Crc32cHasherType, GuestHasher as GuestCrc32cHasher,
    },
    AwsWasmChecksumsComponent,
};
use core::hash::Hasher;

impl Crc32cHasherType for AwsWasmChecksumsComponent {
    type Hasher = Crc32cHasher;
}

pub(crate) struct Crc32cHasher {
    hasher: RefCell<crc32ccrate::Crc32cHasher>,
}

impl GuestCrc32cHasher for Crc32cHasher {
    fn new() -> Self {
        Self {
            hasher: RefCell::new(crc32ccrate::Crc32cHasher::default()),
        }
    }

    fn update(&self, input: Vec<u8>) {
        self.hasher.borrow_mut().write(&input.as_slice());
    }

    /// Take the inner hasher, finalize it, and replace it with a freshly initialized one
    /// so this resource can be reused.
    fn finalize(&self) -> u32 {
        // The crc32c crate uses the Hasher trait which specifies the output of this function
        // as u64. But the implementation ensures it is actually a u32, so this cast is safe
        // https://docs.rs/crc32c/latest/crc32c/struct.Crc32cHasher.html
        self.hasher.take().finish() as u32
    }

    fn reset(&self) {
        self.hasher.take();
    }
}
