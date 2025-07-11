import { NextResponse } from 'next/server';
import api from '../../../lib/axios.config';



interface RefreshResponse {
  statusCode: number;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
}

export async function POST() {
  try {
    const response = await api.post<RefreshResponse>('/auth/refresh', {});
    const res = NextResponse.json(response, { status: response.status });
    res.cookies.set('access_token', response.data.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookies.set('refresh_token', response.data.data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
    return res;

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Refresh token failed';
    return NextResponse.json({ message }, { status: 401 });
  }
}
