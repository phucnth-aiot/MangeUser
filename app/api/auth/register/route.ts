import { NextRequest, NextResponse } from 'next/server';
import api from '../../../lib/axios.config';

import { AxiosError } from 'axios';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const response = await api.post('/auth/register', body);

    return NextResponse.json(
      { message: 'Đăng ký thành công', data: response.data },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Lỗi từ BE:', error.response?.data || error.message);
    } else {
      console.error('Lỗi không xác định:', String(error));
    }

    return NextResponse.json(
      { message: 'Đăng ký thất bại' },
      { status: 400 }
    );
  }
}
