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

//Some util functions to convert numbers/bigints to byte arrays
function bitLength(number) {
  return Math.floor(Math.log2(number)) + 1;
}

function byteLength(number) {
  return Math.ceil(bitLength(number) / 8);
}

function toBytes(number): ArrayBuffer {
  if (!Number.isSafeInteger(number)) {
    throw new Error("Number is out of range");
  }

  const size = number === 0 ? 0 : byteLength(number);
  const bytes = new Uint8ClampedArray(size);
  let x = number;
  for (let i = size - 1; i >= 0; i--) {
    const rightByte = x & 0xff;
    bytes[i] = rightByte;
    x = Math.floor(x / 0x100);
  }

  return bytes.buffer;
}

function bnToBuf(bn: bigint): Uint8Array {
  var hex = BigInt(bn).toString(16);
  if (hex.length % 2) {
    hex = "0" + hex;
  }

  var len = hex.length / 2;
  var u8 = new Uint8Array(len);

  var i = 0;
  var j = 0;
  while (i < len) {
    u8[i] = parseInt(hex.slice(j, j + 2), 16);
    i += 1;
    j += 2;
  }

  return u8;
}

test("CRC64-NVME function Hello, World!", () => {
  let helloWorld = Buffer.from("Hello, World!");
  let hashOut = crc64NvmeHash(helloWorld);
  let b64encodedchecksum = Buffer.from(bnToBuf(hashOut)).toString("base64");
  expect(b64encodedchecksum).toBe("1Km+Qyat0k0=");
});

test("CRC64-NVME hasher Hello, World!", () => {
  let hasher = new crc64NvmeHasher.Hasher();
  hasher.update(Buffer.from("Hello,"));
  hasher.update(Buffer.from(" World!"));
  let hashOut = hasher.finalize();
  let b64encodedchecksum = Buffer.from(bnToBuf(hashOut)).toString("base64");
  expect(b64encodedchecksum).toBe("1Km+Qyat0k0=");
});

test("CRC64-NVME function empty string", () => {
  let helloWorld = Buffer.from("");
  let hashOut = crc64NvmeHash(helloWorld);
  let b64encodedchecksum = Buffer.from(bnToBuf(hashOut)).toString("base64");
  expect(b64encodedchecksum).toBe("AA==");
});

test("CRC32 function Hello, World!", () => {
  let helloWorld = Buffer.from("Hello, World!");
  let hashOut = crc32Hash(helloWorld);
  let b64encodedchecksum = Buffer.from(toBytes(hashOut)).toString("base64");
  expect(b64encodedchecksum).toBe("7ErD0A==");
});

test("CRC32 hasher Hello, World!", () => {
  let hasher = new crc32Hasher.Hasher();
  hasher.update(Buffer.from("Hello,"));
  hasher.update(Buffer.from(" World!"));
  let hashOut = hasher.finalize();
  let b64encodedchecksum = Buffer.from(toBytes(hashOut)).toString("base64");
  expect(b64encodedchecksum).toBe("7ErD0A==");
});

test("CRC32 function empty string", () => {
  let helloWorld = Buffer.from("");
  let hashOut = crc32Hash(helloWorld);
  let b64encodedchecksum = Buffer.from(toBytes(hashOut)).toString("base64");
  expect(b64encodedchecksum).toBe("");
});

test("CRC32C function Hello, World!", () => {
  let helloWorld = Buffer.from("Hello, World!");
  let hashOut = crc32cHash(helloWorld);
  let b64encodedchecksum = Buffer.from(toBytes(hashOut)).toString("base64");
  expect(b64encodedchecksum).toBe("TVUQaA==");
});

test("CRC32C hasher Hello, World!", () => {
  let hasher = new crc32cHasher.Hasher();
  hasher.update(Buffer.from("Hello,"));
  hasher.update(Buffer.from(" World!"));
  let hashOut = hasher.finalize();
  let b64encodedchecksum = Buffer.from(toBytes(hashOut)).toString("base64");
  expect(b64encodedchecksum).toBe("TVUQaA==");
});

test("CRC32C function empty string", () => {
  let helloWorld = Buffer.from("");
  let hashOut = crc32cHash(helloWorld);
  let b64encodedchecksum = Buffer.from(toBytes(hashOut)).toString("base64");
  expect(b64encodedchecksum).toBe("");
});
