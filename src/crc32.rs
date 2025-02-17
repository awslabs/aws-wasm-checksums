/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

use std::cell::RefCell;

use crate::{
    bindings::exports::component::aws_wasm_checksums::crc32_hasher::{
        Guest as Crc32HasherType, GuestHasher as GuestCrc32Hasher,
    },
    AwsWasmChecksumsComponent,
};

impl Crc32HasherType for AwsWasmChecksumsComponent {
    type Hasher = Crc32Hasher;
}

pub(crate) struct Crc32Hasher {
    hasher: RefCell<crc32fast::Hasher>,
}

impl GuestCrc32Hasher for Crc32Hasher {
    fn new() -> Self {
        Self {
            hasher: RefCell::new(crc32fast::Hasher::new()),
        }
    }

    fn update(&self, input: Vec<u8>) {
        self.hasher.borrow_mut().update(&input);
    }

    /// Take the inner hasher, finalize it, and replace it with a freshly initialized one
    /// so this resource can be reused.
    fn finalize(&self) -> u32 {
        self.hasher.take().finalize()
    }

    fn reset(&self) {
        self.hasher.take();
    }
}
