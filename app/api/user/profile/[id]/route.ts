import { NextResponse } from 'next/server';
import api from '../../../../lib/axios.config';

interface UserResponse {
  statusCode: number;
  message: string;
  data: {
    userid: string;
    username: string;
    phone: string;
    email: string;
    role: string;
    avatarUrl?: string;
  };
}

export async function GET() {
  try {
    const response = await api.get<UserResponse>('/users/me');
    return NextResponse.json(response, { status: response.status });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch user';
    return NextResponse.json({ message }, { status: 401 });
  }
}
