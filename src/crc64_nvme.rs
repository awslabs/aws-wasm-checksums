/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

use crate::{
    bindings::exports::component::aws_wasm_checksums::crc64_nvme_hasher::{
        Guest as Crc64NvmeHasherType, GuestHasher as GuestCrc64NvmeHasher,
    },
    AwsWasmChecksumsComponent,
};
use std::cell::RefCell;

impl Crc64NvmeHasherType for AwsWasmChecksumsComponent {
    type Hasher = Crc64NvmeHasher;
}
use base64::prelude::BASE64_STANDARD;
use base64::Engine;

pub(crate) struct Crc64NvmeHasher {
    digest: RefCell<crc64fast_nvme::Digest>,
}

impl GuestCrc64NvmeHasher for Crc64NvmeHasher {
    fn new() -> Self {
        Self {
            digest: RefCell::new(crc64fast_nvme::Digest::new()),
        }
    }

    fn update(&self, input: Vec<u8>) {
        self.digest.borrow_mut().write(input.as_slice());
    }

    fn finalize(&self) -> Vec<u8> {
        self.digest.take().sum64().to_be_bytes().to_vec()
    }

    fn reset(&self) {
        self.digest.take();
    }

    fn finalize_and_encode(&self) -> String {
        let output = self.digest.take().sum64().to_be_bytes();
        BASE64_STANDARD.encode(output)
    }
}
