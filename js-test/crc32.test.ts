/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { crc32Hash, crc32Hasher } from "../js-bindings/aws_wasm_checksums";
import { expect, test } from "vitest";
import { stringToUint8Array, Uint8ArrayToBase64String } from "./utils";

// CRC32 function
test("CRC32 function Hello, World!", () => {
  let helloWorld = stringToUint8Array("Hello, World!");
  let hashOut = crc32Hash(helloWorld);
  let b64encodedchecksum = Uint8ArrayToBase64String(hashOut);
  expect(b64encodedchecksum).toBe("7ErD0A==");
});

test("CRC32 function empty string", () => {
  let helloWorld = stringToUint8Array("");
  let hashOut = crc32Hash(helloWorld);
  let b64encodedchecksum = Uint8ArrayToBase64String(hashOut);
  expect(b64encodedchecksum).toBe("AAAAAA==");
});

// CRC32 Hasher
test("CRC32 hasher Hello, World!", () => {
  let hasher = new crc32Hasher.Hasher();
  hasher.update(stringToUint8Array("Hello,"));
  hasher.update(stringToUint8Array(" World!"));
  let hashOut = hasher.finalize();
  let b64encodedchecksum = Uint8ArrayToBase64String(hashOut);
  expect(b64encodedchecksum).toBe("7ErD0A==");
});

test("CRC32 hasher encode Hello, World!", () => {
  let hasher = new crc32Hasher.Hasher();
  hasher.update(stringToUint8Array("Hello,"));
  hasher.update(stringToUint8Array(" World!"));
  let hashOut = hasher.finalizeAndEncode();

  expect(hashOut).toBe("7ErD0A==");
});
