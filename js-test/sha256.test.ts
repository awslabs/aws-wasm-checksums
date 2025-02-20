/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { sha256Hash, sha256Hasher } from "../js-bindings/aws_wasm_checksums";
import { expect, test } from "vitest";

// SHA256 function
test("SHA256 function Hello, World!", () => {
  let helloWorld = Buffer.from("Hello, World!");
  let hashOut = sha256Hash(helloWorld);
  let b64encodedchecksum = Buffer.from(hashOut).toString("base64");
  expect(b64encodedchecksum).toBe(
    "3/1gIbsr1bCvZ2KQgJ7DpTGR3YHH9wpLKGiKNiGCmG8="
  );
});

test("SHA256 function empty string", () => {
  let helloWorld = Buffer.from("");
  let hashOut = sha256Hash(helloWorld);
  let b64encodedchecksum = Buffer.from(hashOut).toString("base64");
  expect(b64encodedchecksum).toBe(
    "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU="
  );
});

// SHA256 Hasher
test("SHA256 hasher Hello, World!", () => {
  let hasher = new sha256Hasher.Hasher();
  hasher.update(Buffer.from("Hello,"));
  hasher.update(Buffer.from(" World!"));
  let hashOut = hasher.finalize();
  let b64encodedchecksum = Buffer.from(hashOut).toString("base64");
  expect(b64encodedchecksum).toBe(
    "3/1gIbsr1bCvZ2KQgJ7DpTGR3YHH9wpLKGiKNiGCmG8="
  );
});

test("SHA256 hasher encode Hello, World!", () => {
  let hasher = new sha256Hasher.Hasher();
  hasher.update(Buffer.from("Hello,"));
  hasher.update(Buffer.from(" World!"));
  let hashOut = hasher.finalizeAndEncode();

  expect(hashOut).toBe("3/1gIbsr1bCvZ2KQgJ7DpTGR3YHH9wpLKGiKNiGCmG8=");
});
