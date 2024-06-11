import { NextRequest, NextResponse } from 'next/server';
import { Admin } from '../../../../model/admin';
import { connect } from '../../../../dbConfig/db';

export async function POST(request: NextRequest) {
    await connect();  

    try {
        console.log(process.env.MONG);
        console.log(process.env.CHECK);

        const reqBody = await request.json();
        const { username, password } = reqBody;
console.log(reqBody)
        const admin = await Admin.findOne({ username });

        if (admin) {
          console.log("Admin already exists")
            return NextResponse.json({
                msg: "Admin already exists"
            });
        } else {
            if (username && password) {
                const newAdmin = new Admin({ username, password });
                await newAdmin.save();

                console.log("Admin added successfully");
                return NextResponse.json({
                    msg: "Admin created successfully!"
                });
            } else {
              console.log("Username or password not provided")
                return NextResponse.json({
                    msg: "Username or password not provided"
                });
            }
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
