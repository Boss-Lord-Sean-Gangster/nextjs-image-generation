import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';
const MAX_REQUESTS = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
export async function POST(request) {
  try {
    // Parse the request body as JSON
    const data = await request.json();

    // Validate the data (e.g., check for required fields)
    if (!data.userId || !data.userInfo) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const { userId, userInfo } = data;
    const now = Date.now();
    const rateLimitKey = `rate-limit:${userId}`;

    // Retrieve and filter out timestamps older than the rate limit window
    const requestTimestamps = await kv.lrange(rateLimitKey, 0, -1);
    const recentRequests = requestTimestamps.filter(timestamp => now - parseInt(timestamp) < RATE_LIMIT_WINDOW_MS);
    
     // Check if the user has exceeded the rate limit
     if (recentRequests.length >= MAX_REQUESTS) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

     // Add the current request timestamp
     await kv.rpush(rateLimitKey, now.toString());
    
     // Set expiry on the rate limit key to clean up old timestamps
     await kv.expire(rateLimitKey, Math.ceil(RATE_LIMIT_WINDOW_MS / 1000));



    // Store the data in Redis
    await kv.hset(`user:${userId}`, userInfo);

    // Return a success response
    return NextResponse.json({ message: 'User data stored successfully ' }, { status: 200 });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
