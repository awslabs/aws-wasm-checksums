## AWS WASM Checksums

WASM implementations of the checksums supported by the [Smithy httpChecksum trait](https://smithy.io/2.0/aws/aws-core.html#aws-protocols-httpchecksum-trait). The WASM implementation are based on the [WASM component model](https://component-model.bytecodealliance.org/).

## Using this package

This package supports 5 checksum algorithms: `CRC32`, `CRC32C`, `CRC64NVME`, `SHA1`, and `SHA256`.

Associated with each of these algorithms are two functions, one for hashing to bytes and another for hashing and encoding as a `baase64` string:

```ts
function crc64NvmeHash(input: Uint8Array): Uint8Array;
function crc64NvmeHashAndEncode(input: Uint8Array): string;
```

Each algorithm also has an associated accumulating `Hasher` class, useful for usecases where the full set of bytes to be hashed might not be known up front. The `Hasher` provides functions `finalize` and `finalizeAndEncode` which return bytes and a `base64` encoded string respectively.

```ts
let hasher = new crc64NvmeHasher.Hasher();
hasher.update(stringToUint8Array("Hello,"));
hasher.update(stringToUint8Array(" World!"));
let hashOut = hasher.finalize();
```

## Working with this Repo

To work on this repo you will need [Rust](https://www.rust-lang.org/tools/install), [Node](https://nodejs.org/en/download), and [cargo-component](https://crates.io/crates/cargo-component) installed.

To build the project run:

```sh
npm install
cargo install cargo-component
npx vitest init browser
npm run build
```

To run tests against the javascript bindings run:

```sh
npm run test
```

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.
