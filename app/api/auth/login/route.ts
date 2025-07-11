import { NextResponse } from 'next/server';
import api from '../../../lib/axios.config';

interface LoginRequest {
  phone: string;
  password: string;
}

interface LoginResponse {
  statusCode: number;
  message: string;
  data: {
    user_id: string;
    access_token: string;
    refresh_token: string;
    expires_in: number;
    user: {
      userid: string;
      username: string;
      phone: string;
      email: string;
      role: string;
      avatarUrl?: string;
    };
  };
}

export async function POST(request: Request) {
  try {
    const { phone, password }: LoginRequest = await request.json();
    const response = await api.post<LoginResponse>('/auth/login', { phone, password });
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
    const message = error instanceof Error ? error.message : 'Login failed';
    return NextResponse.json({ message }, { status: 401 });
  }
}
