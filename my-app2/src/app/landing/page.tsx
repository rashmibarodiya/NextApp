'use client'; 


import { Typography, Button } from "@mui/material"
import {  useRouter } from "next/navigation"


function Landing() {
    const router = useRouter()

    return (
        <>
            <div>

                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <div>
                        <Typography>Coursera</Typography>
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <div>
                            <Button
                                onClick={() => {
                                    router.push('/signup');
                                }}

                            >Signup</Button>
                        </div>
                        <div>
                            <Button
                                onClick={() => {
                                    router.push('/signin');
                                }}

                            >Signin</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Landing