/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

use bindings::Guest;

#[allow(warnings)]
mod bindings;
mod crc32;
mod crc32c;
mod crc64_nvme;

/// Top level struct representing the aws-wasm-checksums component.
pub(crate) struct AwsWasmChecksumsComponent;

/// Implementation of the top level Guest trait containing items that are not
/// nested in their own interfaces.
impl Guest for AwsWasmChecksumsComponent {
    fn crc64_nvme_hash(input: Vec<u8>) -> u64 {
        let mut digest = crc64fast_nvme::Digest::new();
        digest.write(input.as_slice());
        digest.sum64()
    }

    fn crc32_hash(input: Vec<u8>) -> u32 {
        crc32fast::hash(&input)
    }

    fn crc32c_hash(input: Vec<u8>) -> u32 {
        crc32ccrate::crc32c(&input)
    }
}

bindings::export!(AwsWasmChecksumsComponent with_types_in bindings);
