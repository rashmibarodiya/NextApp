import { NextRequest,NextResponse } from "next/server";
import {Admin} from "../../../../model/admin"
import { connect } from  "../../../../dbConfig/db"


export async function POST(req: NextRequest) {

  await connect() 
    try{
        console.log("aaya to hu")
        const reqBody = await req.json();
        const{username, password} =  reqBody;

        var admin = Admin.findOne({username, password})

        if(!admin){
            NextResponse.json({
                "msg": "Incorrect username or password"
            })
        }else{
            NextResponse.json({
                "msg": "Admin login successfully"
            }) 
        }        
    }catch(err:any){
        console.log("something went wrong at login")
        console.log(err.message)
    }
    
}