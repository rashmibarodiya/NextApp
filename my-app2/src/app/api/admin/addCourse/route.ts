
import { NextRequest, NextResponse } from 'next/server';
import { Admin } from '../../../../model/admin';
import { Course } from '../../../../model/admin';
import { connect } from '../../../../dbConfig/db';
import { log } from 'console';


export async function POST(req: NextRequest){
    await connect();

    try{

        const reqbody = await req.json()
        const {title, description, price, imageLink} = reqbody
        console.log("here i am here")
        const course = new Course({title, description,price,imageLink})
        await course.save();
        console.log(course)
        return NextResponse.json({ message: 'Course created successfully', courseId: course._id })

    }catch(err : any){
        console.log("Something went wrong")
        console.log(err)
        return NextResponse.json({err : err.message},{status : 500})
    }

}