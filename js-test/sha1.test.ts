/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { sha1Hash, sha1Hasher } from "../js-bindings/aws_wasm_checksums";
import { expect, test } from "vitest";

// SHA1 function
test("SHA1 function Hello, World!", () => {
  let helloWorld = Buffer.from("Hello, World!");
  let hashOut = sha1Hash(helloWorld);
  let b64encodedchecksum = Buffer.from(hashOut).toString("base64");
  expect(b64encodedchecksum).toBe("CgqfKmdylCVXq1NV12r0Qvj2XgE=");
});

test("SHA1 function empty string", () => {
  let helloWorld = Buffer.from("");
  let hashOut = sha1Hash(helloWorld);
  let b64encodedchecksum = Buffer.from(hashOut).toString("base64");
  expect(b64encodedchecksum).toBe("2jmj7l5rSw0yVb/vlWAYkK/YBwk=");
});

// SHA1 Hasher
test("SHA1 hasher Hello, World!", () => {
  let hasher = new sha1Hasher.Hasher();
  hasher.update(Buffer.from("Hello,"));
  hasher.update(Buffer.from(" World!"));
  let hashOut = hasher.finalize();
  let b64encodedchecksum = Buffer.from(hashOut).toString("base64");
  expect(b64encodedchecksum).toBe("CgqfKmdylCVXq1NV12r0Qvj2XgE=");
});

test("SHA1 hasher encode Hello, World!", () => {
  let hasher = new sha1Hasher.Hasher();
  hasher.update(Buffer.from("Hello,"));
  hasher.update(Buffer.from(" World!"));
  let hashOut = hasher.finalizeAndEncode();

  expect(hashOut).toBe("CgqfKmdylCVXq1NV12r0Qvj2XgE=");
});
