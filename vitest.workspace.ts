/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    test: {
      name: "browserTest",
      browser: {
        screenshotFailures: false,
        enabled: true,
        provider: "playwright",
        headless: true,
        // https://vitest.dev/guide/browser/playwright
        instances: [
          { browser: "chromium" },
          { browser: "firefox" },
          { browser: "webkit" },
        ],
      },
    },
  },
  {
    test: {
      name: "nodeTest",
      environment: "node",
    },
  },
]);
