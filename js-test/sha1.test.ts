/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { sha1Hash, sha1Hasher } from "../js-bindings/aws_wasm_checksums";
import { expect, test } from "vitest";
import { stringToUint8Array, Uint8ArrayToBase64String } from "./utils";

// SHA1 function
test("SHA1 function Hello, World!", () => {
  let helloWorld = stringToUint8Array("Hello, World!");
  let hashOut = sha1Hash(helloWorld);
  let b64encodedchecksum = Uint8ArrayToBase64String(hashOut);
  expect(b64encodedchecksum).toBe("CgqfKmdylCVXq1NV12r0Qvj2XgE=");
});

test("SHA1 function empty string", () => {
  let helloWorld = stringToUint8Array("");
  let hashOut = sha1Hash(helloWorld);
  let b64encodedchecksum = Uint8ArrayToBase64String(hashOut);
  expect(b64encodedchecksum).toBe("2jmj7l5rSw0yVb/vlWAYkK/YBwk=");
});

// SHA1 Hasher
test("SHA1 hasher Hello, World!", () => {
  let hasher = new sha1Hasher.Hasher();
  hasher.update(stringToUint8Array("Hello,"));
  hasher.update(stringToUint8Array(" World!"));
  let hashOut = hasher.finalize();
  let b64encodedchecksum = Uint8ArrayToBase64String(hashOut);
  expect(b64encodedchecksum).toBe("CgqfKmdylCVXq1NV12r0Qvj2XgE=");
});

test("SHA1 hasher encode Hello, World!", () => {
  let hasher = new sha1Hasher.Hasher();
  hasher.update(stringToUint8Array("Hello,"));
  hasher.update(stringToUint8Array(" World!"));
  let hashOut = hasher.finalizeAndEncode();

  expect(hashOut).toBe("CgqfKmdylCVXq1NV12r0Qvj2XgE=");
});
