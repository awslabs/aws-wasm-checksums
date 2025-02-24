/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  crc64NvmeHasher,
  crc64NvmeHash,
} from "../js-bindings/aws_wasm_checksums";
import { expect, test } from "vitest";
import { stringToUint8Array, Uint8ArrayToBase64String } from "./utils";

// CRC64 function
test("CRC64-NVME function Hello, World!", () => {
  let helloWorld = stringToUint8Array("Hello, World!");
  let hashOut = crc64NvmeHash(helloWorld);

  let b64Encoded = Uint8ArrayToBase64String(hashOut);
  expect(b64Encoded).toEqual("1Km+Qyat0k0=");
});

test("CRC64-NVME function empty string", () => {
  let helloWorld = stringToUint8Array("");
  let hashOut = crc64NvmeHash(helloWorld);
  let b64encodedchecksum = Uint8ArrayToBase64String(hashOut);
  expect(b64encodedchecksum).toBe("AAAAAAAAAAA=");
});

// CRC64 Hasher
test("CRC64-NVME hasher Hello, World!", () => {
  let hasher = new crc64NvmeHasher.Hasher();
  hasher.update(stringToUint8Array("Hello,"));
  hasher.update(stringToUint8Array(" World!"));
  let hashOut = hasher.finalize();
  let b64encodedchecksum = Uint8ArrayToBase64String(hashOut);
  expect(b64encodedchecksum).toBe("1Km+Qyat0k0=");
});

test("CRC64-NVME hasher encode Hello, World!", () => {
  let hasher = new crc64NvmeHasher.Hasher();
  hasher.update(stringToUint8Array("Hello,"));
  hasher.update(stringToUint8Array(" World!"));
  let hashOut = hasher.finalizeAndEncode();

  expect(hashOut).toBe("1Km+Qyat0k0=");
});
