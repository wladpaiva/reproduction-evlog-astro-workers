import { defineMiddleware } from "astro:middleware";
import { createRequestLogger, initLogger } from "evlog";
import { initWorkersLogger, createWorkersLogger } from 'evlog/workers'
import { createPostHogDrain } from "evlog/posthog";

initLogger({
  env: { service: "website" },
  drain: createPostHogDrain({
    apiKey: import.meta.env.PUBLIC_POSTHOG_KEY,
    host: import.meta.env.PUBLIC_POSTHOG_HOST,
  }),
});

export const onRequest = defineMiddleware(async ({ request, locals }, next) => {
  const log = createRequestLogger(request, { waitUntil: locals.cfContext.waitUntil.bind(locals.cfContext) });

  locals.log = log;

  try {
    const response = await next();
    log.set({ status: response.status });
    log.emit();
    return response;
  } catch (error) {
    log.error(error instanceof Error ? error : new Error(String(error)));
    log.emit();
    throw error;
  }
});
