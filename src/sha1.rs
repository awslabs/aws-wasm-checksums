/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

use crate::{
    bindings::exports::component::aws_wasm_checksums::sha1_hasher::{
        Guest as Sha1HasherType, GuestHasher as GuestSha1Hasher,
    },
    AwsWasmChecksumsComponent,
};
use base64::prelude::BASE64_STANDARD;
use base64::Engine;
use sha1::Digest;
use std::cell::RefCell;

impl Sha1HasherType for AwsWasmChecksumsComponent {
    type Hasher = Sha1Hasher;
}

pub(crate) struct Sha1Hasher {
    hasher: RefCell<sha1::Sha1>,
}

impl GuestSha1Hasher for Sha1Hasher {
    fn new() -> Self {
        Self {
            hasher: RefCell::new(sha1::Sha1::new()),
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
