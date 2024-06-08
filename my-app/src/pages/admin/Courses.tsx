import { useEffect, useState } from "react"
import { Button, Typography, Card } from "@mui/material"
import{CourseType} from "../state/Course"
import { useRouter } from "next/router.js"
import apiURl from "../url"

interface CourseProps {
    course: CourseType;
  }

function Courses() {
    const [courses, setCourses] = useState([])


    useEffect(() => {
        console.log("111111111")
        const url = `${apiURl}admin/courses`;
        fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            if (res.ok) {

                res.json().then((data) => {
                    setCourses(data);
                    console.log(data)
                });
            } else {
                console.log("Failed to fetch courses:", res.status, res.statusText);
            }
        }).catch((err) => {
            console.error("Error fetching courses:", err);
        });
    }, []);


    return (
        <div style={{ marginTop: 0 , backgroundColor : "#74512D"}}>  
            <div >
                <Typography align='center' fontSize={40}>Courses</Typography>
            </div>
            <div style={{
                display: 'flex',
                flexWrap: "wrap",
                justifyContent: "center",
                padding: 20
            }}>

                {courses.map((course) => (
                    <CardShape course={course as CourseType}></CardShape>
                ))}
            </div>
        </div>
    )

}

function CardShape({course} : CourseProps) {
    const { title, description, imageLink, price } = course;
  //const navigate = useNavigate();
  const router = useRouter()
    return (
        <div>
            <Card variant="outlined" style={{
                marginTop: 10,
                minHeight: 200,
                marginRight: 20,
                width: 300,
                padding: 10
            }}>
                <Typography align="center">{title}</Typography>

                <Typography align="center">{description}</Typography>
                <img src={imageLink} style={{ width: '100%', height: 300 }} />

                <div style={{
                    display : "flex",
                    justifyContent : "space-between"
                }}>
                    <div>
                    <Typography  align="center">Price - ${price}</Typography>
                    </div>
                    <div>
                    <Button variant={"outlined"}
                        onClick={() => {
                            router.push(`${course._id}`);
                        }}
                    >edit</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}


export default Courses