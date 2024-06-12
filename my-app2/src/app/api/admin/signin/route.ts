import { NextRequest, NextResponse } from "next/server";
import { Admin } from "../../../../model/admin";
import { connect } from "../../../../dbConfig/db";

export async function POST(req: NextRequest) {
    await connect(); // Ensure the connection is awaited

    try {
        console.log("aaya to hu");
        const reqBody = await req.json();
        const { username, password } = reqBody;

        const admin = await Admin.findOne({ username, password }); // Await the findOne method

        if (!admin) {
            return NextResponse.json({
                msg: "Incorrect username or password"
            }, { status: 401 }); // Use 401 for unauthorized
        } else {
            return NextResponse.json({
                msg: "Admin login successfully"
            });
        }
    } catch (err: any) {
        console.log("something went wrong at login");
        console.log(err.message);
        return NextResponse.json({
            msg: "Internal server error",
            error: err.message
        }, { status: 500 }); // Proper error handling with status 500
    }
}
