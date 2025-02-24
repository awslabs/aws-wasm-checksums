/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { crc32Hash, crc32Hasher } from "../js-bindings/aws_wasm_checksums";
import { expect, test } from "vitest";

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
