import { NextRequest, NextResponse } from 'next/server';
import { Admin } from '../../../../model/admin';
import { Course } from '../../../../model/admin';
import { connect } from '../../../../dbConfig/db';

export async function PUT (req: NextRequest, { params }: { params: { courseId: string } }){

    await connect()

    try{
        var {courseId} = params

        const course  = await  Course.findOne({courseId})

        const reqbody =  await req.json();
        const {title, description, imageLink, price} = reqbody

        
        course.title = title || course.title;
        course.description = description || course.description;
        course.price = price 
        course.imageLink = imageLink || course.imageLink;
        

    }catch(err){
        console.log("something went wrong at editing course")
        console.log(err)
        NextResponse.json({err:err},{status : 500})
    }
}