import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from 'next/server';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.fixedWindow(Number(process.env.MAX_REQUESTS_PER_WINDOW ?? 1), `${Number(process.env.WINDOW_SIZE ?? 5)} s`),
});

/**
 * Checks the rate limit for the incoming request and sets the appropriate headers.
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 * @returns A boolean indicating whether the request is allowed or not, or an object with rate limit state information if the request is rate limited.
 */
async function checkRateLimit(req: NextRequest, res: NextResponse) {
    const result = await ratelimit.limit(req.headers.get('x-forwarded-for')!);
    res.headers.set('X-RateLimit-Limit', `${result.limit}`)
    res.headers.set('X-RateLimit-Remaining', `${result.remaining}`)
    if (!result.success) {
        return { message: 'The request has been rate limited.', rateLimitState: result }
    }
    return true;
}

export { checkRateLimit, ratelimit, redis }