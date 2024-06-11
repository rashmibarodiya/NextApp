
'use client';

import { Button, Typography,CardContent, Card, TextField } from "@mui/material"
import { useState } from "react"
import axios from 'axios'
function Signin() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const handleSignin = async () => {

        try{
        const res = await axios.post("/api/admin/signin", {
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        )

        console.log(res.data);
        alert(res.data)
    }catch(err){
        alert(err)
        console.log("error frontend login ")
        console.log(err)
    }

}
    return(
        <>
        <div style={{
                marginTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center",

            }}>
                <Typography fontSize={20} >Welcome back. Login below</Typography>


            </div>
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>

                <Card  style={{ padding: 20  , borderRadius : 10 ,backgroundColor: '#7F8C8D'}} >
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
                                    handleSignin()
                            
                        }}
                        size={"large"}
                        variant="outlined"


                    >Signin</Button>

                </Card>
            </div>

        
        </>
    )

}





export default Signin;