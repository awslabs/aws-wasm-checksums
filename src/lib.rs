/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

use base64::prelude::BASE64_STANDARD;
use base64::Engine;
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
    fn crc64_nvme_hash(input: Vec<u8>) -> Vec<u8> {
        let mut digest = crc64fast_nvme::Digest::new();
        digest.write(input.as_slice());
        digest.sum64().to_be_bytes().to_vec()
    }

    fn crc64_nvme_hash_and_encode(input: Vec<u8>) -> String {
        let mut digest = crc64fast_nvme::Digest::new();
        digest.write(input.as_slice());
        BASE64_STANDARD.encode(digest.sum64().to_be_bytes())
    }

    fn crc32_hash(input: Vec<u8>) -> Vec<u8> {
        crc32fast::hash(&input).to_be_bytes().to_vec()
    }

    fn crc32_hash_and_encode(input: Vec<u8>) -> String {
        BASE64_STANDARD.encode(crc32fast::hash(&input).to_be_bytes())
    }

    fn crc32c_hash(input: Vec<u8>) -> Vec<u8> {
        crc32ccrate::crc32c(&input).to_be_bytes().to_vec()
    }

    fn crc32c_hash_and_encode(input: Vec<u8>) -> String {
        BASE64_STANDARD.encode(crc32ccrate::crc32c(&input).to_be_bytes())
    }
}

bindings::export!(AwsWasmChecksumsComponent with_types_in bindings);
