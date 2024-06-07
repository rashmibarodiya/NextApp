import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
//import { useNavigate } from 'react-router-dom';

import { useRouter } from "next/router.js"
import {userName} from '../state/Username.jsx'
import { useSetRecoilState,useRecoilValue } from 'recoil';


 export function Adminbar() {

    //good image https://static.technians.com/wp-content/uploads/2020/02/Guidelines-for-images-of-website-desig-title.jpg

   //const navigate = useNavigate();
   const router = useRouter()
    const username = useRecoilValue(userName)
    console.log("usernameeee :: ; "+username)
   // const setUsername = useSetRecoilState(userName)

//    // const [username, setUsername] = useState("")
//     const url = `https://fantastic-happiness-jjrgp4974647f5rr5-8000.app.github.dev`;
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         console.log("token :: " + token)

//         fetch(`${url}` + `/admin/me`, {
//             method: 'GET',
//             headers: {
//                 "authorization": `Bearer ${localStorage.getItem("token")}`
//             }
//         }).then((res) => {
//             if (res.ok) {
//                 return res.text().then((data) => {
//                     setUsername(data);
//                     console.log("DATA : " + data);
//                 });
//             } else {
//                 return res.text().then((text) => {
//                     console.log("Non-JSON Response: " + text);
//                 });
//             }
//         })

//     }, []);


    if (username) {
        return (

            <>
          <div style={{
            backgroundColor :"#543310"
          }}>

                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <Typography fontSize={20} style={{fontStyle : "normal", fontFamily: "cursive"}}>Hi {username}!</Typography>
                </div>

                <div style={{

                    display: "flex",
                    justifyContent: "space-between"
                }}>


                    <div >
                        <Typography fontSize={20}>Coursera</Typography>
                    </div>

                    <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", gap: 10 }}>
                        <div >
                            <Button variant={"outlined"}

                                onClick={() => {
                                    router.push('/AddCourse')
                                }}>Add Course
                            </Button>
                        </div>
                        <div >
                            <Button variant={"outlined"}

                                onClick={() => {
                                    router.push('admin/Courses')
                                }}>Courses
                            </Button>
                        </div>

                        <div style={{ marginRight: 10 }}>
                            <Button variant={"outlined"}
                                onClick={() => {
                                 //   localStorage.setItem("token", null)
                                   // window.location = "/" ///************************ */
                                }}
                            >Logout</Button>
                        </div>


                    </div>


                </div>
                </div>

                {/* <div style={{
                    display:"flex",
                    justifyContent:"center",
                    marginTop :20
                }}  >
                <img src={`https://www.buhave.com/wp-content/uploads/2019/05/education.jpg`} style={{display:"flex",
                    justifyContent:"center",zIndex : 0,
                    marginTop :40, width: 'auto', height: 400 }} />
                </div> */}


            </>
        )
    }

    return (
        <>

            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>

                <div style={{ padding: 20 }}>
                    <Typography fontSize={20}>Coursera</Typography>
                </div>

                <div style={{ display: "flex", padding: 20 }}>
                    <div style={{ marginRight: 10 }}>
                        <Button variant={"outlined"}
                            onClick={() => {
                                router.push('admin/signup');
                            }}
                        >Signup</Button>
                    </div>

                    <div>
                        <Button variant={"outlined"}
                            onClick={() => {

                                router.push('admin/login');

                            }}
                        >LOGIN</Button>
                    </div>

                </div>
            </div>
        </>
    );
}
export default Adminbar;