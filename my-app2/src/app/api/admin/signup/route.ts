import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {

    
    console.log(process.env.CHECK);
    const reqBody = await request.json();
    const { username, password } = reqBody;

    console.log(reqBody);

    // Perform user creation logic here

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
