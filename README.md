## AWS WASM Checksums

WASM mplementations of the checksums supported by the [Smithy httpChecksum trait](https://smithy.io/2.0/aws/aws-core.html#aws-protocols-httpchecksum-trait). The WASM implementation are based on the [WASM component model](https://component-model.bytecodealliance.org/).

## Working with this REPO

To work on this repo you will need [Rust](https://www.rust-lang.org/tools/install), [Node](https://nodejs.org/en/download), and [cargo-component](https://crates.io/crates/cargo-component) installed.

To build the project run:

```sh
npm install
cargo install cargo-component
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
