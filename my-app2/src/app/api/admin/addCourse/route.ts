
import { NextRequest, NextResponse } from 'next/server';
import { Admin } from '../../../../model/admin';
import { Course } from '../../../../model/admin';
import { connect } from '../../../../dbConfig/db';
import { log } from 'console';


export async function POST(req: NextRequest){
    await connect();

    try{
        const reqbody = await req.json()
        const {title, des, price, img} = reqbody
        const course = new Course({title, des,price,img})
        await course.save();
        console.log(course)
        NextResponse.json({ message: 'Course created successfully', courseId: course.id })

    }catch(err : any){
        console.log("Something went wrong")
        console.log(err)
        return NextResponse.json({err : err.message},{status : 500})
    }

}