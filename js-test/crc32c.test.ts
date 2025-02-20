/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { crc32cHash, crc32cHasher } from "../js-bindings/aws_wasm_checksums";
import { expect, test } from "vitest";

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
