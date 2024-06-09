// import React, { useState, useEffect } from 'react';
// import { Button, Typography } from "@mui/material";
// //import { useNavigate } from 'react-router-dom';

// import { useRouter } from "next/router.js"
// import { Adminbar } from "./admin/Adminbar";
// // import { Userbar } from "./user/Userbar.tsx";
// import { userRole } from './state/Username';
// import { useSetRecoilState, useRecoilValue } from 'recoil';
// import { userName } from './state/Username';
// //import index from "./api"
// import apiURl from "./url"


// function checkUser() {
//     const setUsername = useSetRecoilState(userName);
//     const setRole = useSetRecoilState(userRole);
//     const url = `${apiURl}`;

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         console.log("token :: " + token)
// try{
//     fetch('api/me',{
//             method: 'GET',
//             headers: {
//                 // "authorization": `Bearer ${localStorage.getItem("token")}`
//             }
//         }).then((res) => {
//             if (res.ok) {
//                 return res.json().then((data) => {
//                     setUsername(data.username);
//                     if(data.role === "admin"){
//                         setRole("admin");
//                     } else if(data.role === "user"){
//                         setRole("user");
//                     } 
//                     console.log("DATA : " + data);
//                     // window.location = "/"
//                 });
//             } else {
//                 return res.text().then((text) => {
//                     console.log("Non-JSON Response: " + text);
//                 });
//             }
//         });
//     }catch(err){
//         console.log("error is this **"+ err)
//     }

//     }, [setUsername, setRole]); // Ensure useEffect runs only when setUsername or setRole changes
// }

// function Appbar2() {
//     checkUser();
//     const role = useRecoilValue(userRole);
//     const username = useRecoilValue(userName)
//     console.log("role ********** "+ role);
//     console.log("username ********** "+ username);

//     if (role === null) {
//         return null; // Return null while the role is being fetched
//     }

//     return (
//         <div>
            
//         {!role ? (
//             <Classic />
//         ) : role === "admin" ? (
            
//             <div>
//                 <Adminbar />
//             </div>
//         ) : (
//             <div>
//                 {/* <Userbar /> */}
//             </div>
//         )}
//     </div>
//     );
// }

// function Classic() {
//     const setRole = useSetRecoilState(userRole);

//     return (
//         <>
//             <div style={{ display: "flex", justifyContent: "space-between", padding: 10 }} >
//                 <div >
//                     <Typography fontSize={20} variant="body1" style={{ color: '#333' }}>Coursera</Typography>
//                 </div>
//                 <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
//                     <div >
//                         <Button
//                             onClick={() => {
//                                 setRole("admin");
//                             }}
//                             variant="outlined"
//                         >
//                             Admin
//                         </Button>
//                     </div>
//                     <div>
//                         <Button
//                             onClick={() => {
//                                 setRole("user");
//                                 // window.location = "/Userbar"
//                             }}
//                             variant="outlined"
//                         >
//                             User
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//             <div style={{
//                 marginTop: 75,
//                 color: "#303030"
//             }}>
//                 <Typography fontSize={60} align="center" fontStyle="initial">Welcome to Coursera</Typography>
//                 <div style={{
//                     display: "flex",
//                     justifyContent: "center"
//                 }}  >
//                     <img src={`https://getwallpapers.com/wallpaper/full/2/2/7/834570-learning-wallpapers-2960x1661-for-iphone-5.jpg`} 
//                     style={{ width: 'auto', height: 420 }} />
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Appbar2;


// pages/AppBar.tsx
import { useState } from 'react';

const Appbar2 = () => {
  const [route1Data, setRoute1Data] = useState(null);
  const [route2Data, setRoute2Data] = useState(null);

  const callRoute1Api = async () => {
    ///workspaces/NextApp/my-app/src/pages/api/hello.ts
    const response = await fetch('/my-app/src/pages/api/hello/route1');
   // my-app/src/pages/Appbar2.tsx
    const data = await response.json();
    console.log('Route 1 response:', data);
    setRoute1Data(data);
  };

  const callRoute2Api = async () => {
    const response = await fetch('/api/route2');
    const data = await response.json();
    console.log('Route 2 response:', data);
    setRoute2Data(data);
  };

  return (
    <div>
      <button onClick={callRoute1Api}>Call Route 1 API</button>
      <button onClick={callRoute2Api}>Call Route 2 API</button>
      <div>
        <h3>Route 1 Data:</h3>
        <pre>{JSON.stringify(route1Data, null, 2)}</pre>
      </div>
      <div>
        <h3>Route 2 Data:</h3>
        <pre>{JSON.stringify(route2Data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Appbar2;
