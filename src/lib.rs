/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

use ::sha1::Digest as Sha1Digest;
use base64::prelude::BASE64_STANDARD;
use base64::Engine;
use bindings::Guest;

#[allow(warnings)]
mod bindings;
mod crc32;
mod crc32c;
mod crc64_nvme;
mod sha1;
mod sha256;

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

    fn sha256_hash(input: Vec<u8>) -> Vec<u8> {
        let mut hasher = sha2::Sha256::new();
        hasher.update(input);
        hasher.finalize().to_vec()
    }

    fn sha256_hash_and_encode(input: Vec<u8>) -> String {
        let mut hasher = sha2::Sha256::new();
        hasher.update(input);
        BASE64_STANDARD.encode(hasher.finalize())
    }

    fn sha1_hash(input: Vec<u8>) -> Vec<u8> {
        let mut hasher = ::sha1::Sha1::new();
        hasher.update(input);
        hasher.finalize().to_vec()
    }

    fn sha1_hash_and_encode(input: Vec<u8>) -> String {
        let mut hasher = ::sha1::Sha1::new();
        hasher.update(input);
        BASE64_STANDARD.encode(hasher.finalize())
    }
}

bindings::export!(AwsWasmChecksumsComponent with_types_in bindings);
