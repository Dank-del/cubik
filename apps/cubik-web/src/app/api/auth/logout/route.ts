import { checkRateLimit } from '@/utils/helpers/rate-limit';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const res = NextResponse.next();
  const limit = await checkRateLimit(req, res);
  if (limit !== true) {
    return NextResponse.json(limit, { status: 429 });
  }
  try {
    const cookieStore = cookies();
    cookieStore.delete('authToken');
    return NextResponse.json({
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: 'Something went wrong',
    });
  }
};
