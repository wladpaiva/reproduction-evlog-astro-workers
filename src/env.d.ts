/// <reference types="astro/client" />
/// <reference types="@astrojs/cloudflare" />

import type { RequestLogger } from "evlog";

declare global {
  namespace App {
    interface Locals {
      log: RequestLogger;
    }
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_POSTHOG_HOST?: string;
  readonly PUBLIC_POSTHOG_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
