
import { NextRequest, NextResponse } from 'next/server';
import { Admin } from '../../../../model/admin';
import { Course } from '../../../../model/admin';
import { connect } from '../../../../dbConfig/db';

export async function GET(){
    await connect();

    try{    
        const courses = await Course.find({})

      //  console.log(course)
       return NextResponse.json(courses)

    }catch(err : any){
        console.log("Something went wrong")
        console.log(err)
        return NextResponse.json({err : err.message},{status : 500})
    }


    
}