import { NextRequest, NextResponse } from 'next/server';
import { Admin } from '../../../../model/admin';

export async function POST(request: NextRequest) {
  try {


    console.log(process.env.MONG)
    
    console.log(process.env.CHECK);
    const reqBody = await request.json();
    const { username, password } = reqBody;

   

    var admin = Admin.findOne({username})

    if(admin != null){
        NextResponse.json({
            msg :"Admin already exist"
        })
    }else{

        if(username && password){
          const newadmin = new Admin({
                username,
                password
            })

          await newadmin.save()

          console.log("admin added successfully")
          NextResponse.json({
            msg : "Admin created successfully!"
          })
        }
        NextResponse.json({
            msg : "username || password not exist"
        })
        
    }

    // Perform user creation logic here

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}