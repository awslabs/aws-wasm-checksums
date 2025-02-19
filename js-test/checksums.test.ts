/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  crc64NvmeHasher,
  crc64NvmeHash,
  crc32Hash,
  crc32Hasher,
  crc32cHash,
  crc32cHasher,
} from "../js-bindings/aws_wasm_checksums";
import { expect, test } from "vitest";

// CRC64 function
test("CRC64-NVME function Hello, World!", () => {
  let helloWorld = Buffer.from("Hello, World!");
  let hashOut = crc64NvmeHash(helloWorld);

  let b64Encoded = Buffer.from(hashOut).toString("base64");
  expect(b64Encoded).toEqual("1Km+Qyat0k0=");
});

test("CRC64-NVME function empty string", () => {
  let helloWorld = Buffer.from("");
  let hashOut = crc64NvmeHash(helloWorld);
  let b64encodedchecksum = Buffer.from(hashOut).toString("base64");
  expect(b64encodedchecksum).toBe("AAAAAAAAAAA=");
});

// CRC64 Hasher
test("CRC64-NVME hasher Hello, World!", () => {
  let hasher = new crc64NvmeHasher.Hasher();
  hasher.update(Buffer.from("Hello,"));
  hasher.update(Buffer.from(" World!"));
  let hashOut = hasher.finalize();
  let b64encodedchecksum = Buffer.from(hashOut).toString("base64");
  expect(b64encodedchecksum).toBe("1Km+Qyat0k0=");
});

test("CRC64-NVME hasher encode Hello, World!", () => {
  let hasher = new crc64NvmeHasher.Hasher();
  hasher.update(Buffer.from("Hello,"));
  hasher.update(Buffer.from(" World!"));
  let hashOut = hasher.finalizeAndEncode();

  expect(hashOut).toBe("1Km+Qyat0k0=");
});

// CRC32 function
test("CRC32 function Hello, World!", () => {
  let helloWorld = Buffer.from("Hello, World!");
  let hashOut = crc32Hash(helloWorld);
  let b64encodedchecksum = Buffer.from(hashOut).toString("base64");
  expect(b64encodedchecksum).toBe("7ErD0A==");
});

test("CRC32 function empty string", () => {
  let helloWorld = Buffer.from("");
  let hashOut = crc32Hash(helloWorld);
  let b64encodedchecksum = Buffer.from(hashOut).toString("base64");
  expect(b64encodedchecksum).toBe("AAAAAA==");
});

// CRC32 Hasher
test("CRC32 hasher Hello, World!", () => {
  let hasher = new crc32Hasher.Hasher();
  hasher.update(Buffer.from("Hello,"));
  hasher.update(Buffer.from(" World!"));
  let hashOut = hasher.finalize();
  let b64encodedchecksum = Buffer.from(hashOut).toString("base64");
  expect(b64encodedchecksum).toBe("7ErD0A==");
});

test("CRC32 hasher encode Hello, World!", () => {
  let hasher = new crc32Hasher.Hasher();
  hasher.update(Buffer.from("Hello,"));
  hasher.update(Buffer.from(" World!"));
  let hashOut = hasher.finalizeAndEncode();

  expect(hashOut).toBe("7ErD0A==");
});

// CRC32C function
test("CRC32C function Hello, World!", () => {
  let helloWorld = Buffer.from("Hello, World!");
  let hashOut = crc32cHash(helloWorld);
  let b64encodedchecksum = Buffer.from(hashOut).toString("base64");
  expect(b64encodedchecksum).toBe("TVUQaA==");
});

test("CRC32C function empty string", () => {
  let helloWorld = Buffer.from("");
  let hashOut = crc32cHash(helloWorld);
  let b64encodedchecksum = Buffer.from(hashOut).toString("base64");
  expect(b64encodedchecksum).toBe("AAAAAA==");
});

// CRC32C Hasher
test("CRC32C hasher Hello, World!", () => {
  let hasher = new crc32cHasher.Hasher();
  hasher.update(Buffer.from("Hello,"));
  hasher.update(Buffer.from(" World!"));
  let hashOut = hasher.finalize();
  let b64encodedchecksum = Buffer.from(hashOut).toString("base64");
  expect(b64encodedchecksum).toBe("TVUQaA==");
});

test("CRC32C hasher encode Hello, World!", () => {
  let hasher = new crc32cHasher.Hasher();
  hasher.update(Buffer.from("Hello,"));
  hasher.update(Buffer.from(" World!"));
  let hashOut = hasher.finalizeAndEncode();

  expect(hashOut).toBe("TVUQaA==");
});
