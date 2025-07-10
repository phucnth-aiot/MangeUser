import { NextRequest, NextResponse } from 'next/server';
import api from '../../../../lib/axios.server';
import { AxiosError } from 'axios';
import { getValidAccessToken } from '../../../../lib/getValidAccessToken'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const { accessToken, response } = await getValidAccessToken(req);

  if (response) {
    return response; // Trả về redirect hoặc set cookie
  }

  try {
    const response = await api.get(`users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(
      { message: 'Call user profile successful', data: response.data },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Lỗi từ BE:', error.response?.data || error.message);
    } else {
      console.error('Lỗi không xác định:', String(error));
    }

    return NextResponse.json(
      { message: 'Access profile fail' },
      { status: 400 }
    );
  }
}
