/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { crc32cHash, crc32cHasher } from "../js-bindings/aws_wasm_checksums";
import { expect, test } from "vitest";
import { stringToUint8Array, Uint8ArrayToBase64String } from "./utils";

// CRC32C function
test("CRC32C function Hello, World!", () => {
  let helloWorld = stringToUint8Array("Hello, World!");
  let hashOut = crc32cHash(helloWorld);
  let b64encodedchecksum = Uint8ArrayToBase64String(hashOut);
  expect(b64encodedchecksum).toBe("TVUQaA==");
});

test("CRC32C function empty string", () => {
  let helloWorld = stringToUint8Array("");
  let hashOut = crc32cHash(helloWorld);
  let b64encodedchecksum = Uint8ArrayToBase64String(hashOut);
  expect(b64encodedchecksum).toBe("AAAAAA==");
});

// CRC32C Hasher
test("CRC32C hasher Hello, World!", () => {
  let hasher = new crc32cHasher.Hasher();
  hasher.update(stringToUint8Array("Hello,"));
  hasher.update(stringToUint8Array(" World!"));
  let hashOut = hasher.finalize();
  let b64encodedchecksum = Uint8ArrayToBase64String(hashOut);
  expect(b64encodedchecksum).toBe("TVUQaA==");
});

test("CRC32C hasher encode Hello, World!", () => {
  let hasher = new crc32cHasher.Hasher();
  hasher.update(stringToUint8Array("Hello,"));
  hasher.update(stringToUint8Array(" World!"));
  let hashOut = hasher.finalizeAndEncode();

  expect(hashOut).toBe("TVUQaA==");
});
