import api from '../../../lib/axios.server';
import {AxiosError} from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    const body = await req.json();

    const { phone, password } = body;
    
    try {
        const authenResponse = await api.post(
          'auth/login',{
            phone,
            password
          }
        );

        const { user_id, role, access_token, refresh_token } = authenResponse.data;
        
        const res = NextResponse.json(
            {
              message: 'login successfully',
            },
            {status: 200}
        )
        // console.log('✅ Login success. user_id =', user_id);
        // console.log('res = ', res);
        
        res.cookies.set({
          name: 'access_token',
          value: access_token,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 15,
          path: '/'
        })

        res.cookies.set({
          name: 'refresh_token',
          value: refresh_token,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7,
          path:'/'
        })

        res.cookies.set({
          name: 'role',
          value: role,
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 15,
          path: '/'
        })

        res.cookies.set({
          name: 'user_id',
          value: user_id,
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 15,
          path: '/'
        })
        
        return res;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.error("Login error:", error.response?.data || error.message);
        } else if (error instanceof Error) {
          console.error("Login error:", error.message);
        } else {
          console.error("Login error:", String(error));
        }
        return NextResponse.json(
          { message: "Login failed" },
          { status: 401 }
        );
    }
}
