/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Utils for converting string/byte array types, these work in both Node and
// Chromium/Firefox/Webkit browser environments

export const stringToUint8Array = (str: string): Uint8Array => {
  const encoder = new TextEncoder();
  return encoder.encode(str);
};

export const Uint8ArrayToBase64String = (buffer: Uint8Array): string => {
  return btoa(String.fromCharCode.apply(null, buffer));
};
