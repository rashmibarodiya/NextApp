

'use client';

import { Button, Typography,CardContent, Card, TextField } from "@mui/material"
import { useState } from "react"
import axios from 'axios'
import {  useRouter } from "next/navigation"

function Signup() {
   // require('dotnev').config()
   // const backendUrl= process.env.BACKEND_URL;

   const router = useRouter()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const url = `/api/admin/signup`;
 
//my-app/src/pages/api/admin/signup/route.ts


const handleSignup = async ( username: string, password: string): Promise<void> => {
  try {
    const response = await axios.post(url, {
      username,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('d');
    console.log(response.data);
    // localStorage.setItem("token", response.data.token);
    // window.location("/");

    alert(response.data.msg);
    router.push("/signin")
  } catch (err) {
    alert(err);
    console.log('Error occurred');
    console.log(err);
  }
};

 //const url = 'admin/signup'
 

    return (
        <>


            <div style={{
                marginTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center",

            }}>
                <Typography fontSize={20} >Welcome to Coursera. Signup below</Typography>


            </div>
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>

                <Card  style={{ padding: 20  , borderRadius : 10 ,backgroundColor: '#839192'}} >
                    <TextField
                   // value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        fullWidth={true}
                        id="outlined-basic"
                        label="username"
                        variant="outlined"
                    />
                    <br />
                    <br />
                    <TextField
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        fullWidth
                        id="outlined-basic"
                        label="password"
                        type='password'
                        variant="outlined"
                    />
                    <br />
                    <br />
                    
                    <Button
                        onClick={() => {
                                    handleSignup(username,password)

                            
                        }}
                        size={"large"}
                        variant="outlined"


                    >Signup</Button>

                </Card>
            </div>


        </>
    )
}

export default Signup