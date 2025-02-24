/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

use crate::{
    bindings::exports::component::aws_wasm_checksums::sha256_hasher::{
        Guest as Sha256HasherType, GuestHasher as GuestSha256Hasher,
    },
    AwsWasmChecksumsComponent,
};
use base64::prelude::BASE64_STANDARD;
use base64::Engine;
use sha2::Digest;
use std::cell::RefCell;

impl Sha256HasherType for AwsWasmChecksumsComponent {
    type Hasher = Sha256Hasher;
}

pub(crate) struct Sha256Hasher {
    hasher: RefCell<sha2::Sha256>,
}

impl GuestSha256Hasher for Sha256Hasher {
    fn new() -> Self {
        Self {
            hasher: RefCell::new(sha2::Sha256::new()),
        }
    }

    fn update(&self, input: Vec<u8>) {
        self.hasher.borrow_mut().update(&input);
    }

    /// Take the inner hasher, finalize it, and replace it with a freshly initialized one
    /// so this resource can be reused.
    fn finalize(&self) -> Vec<u8> {
        self.hasher.take().finalize().to_vec()
    }

    fn reset(&self) {
        self.hasher.take();
    }

    fn finalize_and_encode(&self) -> String {
        let output = self.hasher.take().finalize();
        BASE64_STANDARD.encode(output)
    }
}
