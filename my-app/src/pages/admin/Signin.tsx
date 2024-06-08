

import { Button, Typography, Card, TextField } from "@mui/material"
import{useState} from 'react'
import axios from 'axios'
//import { useNavigate } from 'react-router-dom';

import { useRouter } from "next/router.js"
import {userName} from '../state/Username.jsx'
import { useSetRecoilState} from 'recoil';
import apiURl from "../url"

function Signin() {
    //const navigate = useNavigate();
    const router = useRouter()
    const url = `${apiURl}admin/login`
    const [username, setUsername] = useState("");
    const x = useSetRecoilState(userName )
    const [password, setPassword] = useState("");
    return (
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

                <Card variant='outlined' style={{ width: 300, padding: 20 , borderRadius : 10}} >
                    <TextField
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                       // fullWidth={"true"}
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
                        fullWidth = {true}
                        id="outlined-basic"
                        label="password"
                        type='password'
                        variant="outlined"
                    />
                    <br />
                    <br />
                    <Button size={"large"} variant="outlined"
                    
                        onClick={async () => {
                            let res = await axios.post(`${url}`, {
                                username: username,
                                password: password
                            },{
                                headers:{
                                    "Content-type":"application/json"
                                }
                            })
                            
                            localStorage.setItem("token", res.data.token)
                            x(username)
                            alert("user signin successfully")
                            //************************ */
                            router.push("/")
                           // navigate('/')
                        
                        }}


                    >Signin</Button>

                </Card>
            </div>


        </>
    )
}

export default Signin