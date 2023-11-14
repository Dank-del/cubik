import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/utils/helpers/rate-limit';

export const runtime = 'edge';

export const GET = async (req: NextRequest) => {
    const res = NextResponse.next();
    const limit = await checkRateLimit(req, res);
    if (limit !== true) {
        return NextResponse.json(limit, { status: 429 });
    }
    return NextResponse.json({ message: 'Hello world!' });
}