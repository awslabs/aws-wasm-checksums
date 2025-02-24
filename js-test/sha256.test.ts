/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { sha256Hash, sha256Hasher } from "../js-bindings/aws_wasm_checksums";
import { expect, test } from "vitest";
import { stringToUint8Array, Uint8ArrayToBase64String } from "./utils";

// SHA256 function
test("SHA256 function Hello, World!", () => {
  let helloWorld = stringToUint8Array("Hello, World!");
  let hashOut = sha256Hash(helloWorld);
  let b64encodedchecksum = Uint8ArrayToBase64String(hashOut);
  expect(b64encodedchecksum).toBe(
    "3/1gIbsr1bCvZ2KQgJ7DpTGR3YHH9wpLKGiKNiGCmG8="
  );
});

test("SHA256 function empty string", () => {
  let helloWorld = stringToUint8Array("");
  let hashOut = sha256Hash(helloWorld);
  let b64encodedchecksum = Uint8ArrayToBase64String(hashOut);
  expect(b64encodedchecksum).toBe(
    "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU="
  );
});

// SHA256 Hasher
test("SHA256 hasher Hello, World!", () => {
  let hasher = new sha256Hasher.Hasher();
  hasher.update(stringToUint8Array("Hello,"));
  hasher.update(stringToUint8Array(" World!"));
  let hashOut = hasher.finalize();
  let b64encodedchecksum = Uint8ArrayToBase64String(hashOut);
  expect(b64encodedchecksum).toBe(
    "3/1gIbsr1bCvZ2KQgJ7DpTGR3YHH9wpLKGiKNiGCmG8="
  );
});

test("SHA256 hasher encode Hello, World!", () => {
  let hasher = new sha256Hasher.Hasher();
  hasher.update(stringToUint8Array("Hello,"));
  hasher.update(stringToUint8Array(" World!"));
  let hashOut = hasher.finalizeAndEncode();

  expect(hashOut).toBe("3/1gIbsr1bCvZ2KQgJ7DpTGR3YHH9wpLKGiKNiGCmG8=");
});
