'use client'

import { useEffect, useState } from "react";
import { Button, Typography, Card,TextField} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSetRecoilState,useRecoilValue, useRecoilState } from "recoil";
type courseType = {
    title: string;
    description: string;
    price: number;
    imageLink: string;
}

interface CardShapeProps {
    course: courseType;
}
interface numType {
  courseId: number;
}


const courseState = atom({
  key: 'courseState',
  default: [],
});

function Course() {
  const { courseId } = useParams();
  const url = `https://fantastic-happiness-jjrgp4974647f5rr5-8000.app.github.dev/admin/courses`;

  const setCourses = useSetRecoilState(courseState);

  useEffect(() => {
    fetch(`${url}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then((res) => {
      res.json().then((data) => {
        setCourses(data)
      })
    })
  }, [setCourses, url])

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-around",
      marginTop: '100'
    }}>
      {/* <topper/> */}
      <CourseCard courseId={courseId}></CourseCard>
      <UpdateCard courseId={courseId} url={url}></UpdateCard>
    </div>
  );
}

function CourseCard(props :numType ) {
  const { courseId } = props;
  const courses = (courseState);
  let course : courseType = null 
  courses.map((a) => {
    if (a._id == courseId) {
      course = a;
    }
  })
  if (!course) return <div>loading.ll...</div>;
  console.log("hi::::" + course.imageLink)
  return (
    <div>
      <Card variant="outlined" style={{ marginTop: 10, minHeight: 200, marginRight: 20, width: 300, padding: 10 }}>
        <Typography align="center">{course.title}</Typography>
        <Typography align="center">{course.description}</Typography>
        <img src={course.imageLink} style={{ width: '100%', height: 300 }} />
        <Typography align="left">Price - ${course.price}</Typography>

      </Card>
    </div>
  );
}


function UpdateCard(props) {
  const { courseId, url } = props;
  const [courses, setCourses] = useRecoilState(courseState);
  
  const [title, setTitle] = useState(courses.title);
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [price, setPrice] = useState("");


  let course = null
  courses.map((a) => {
    if (a._id == courseId) {
      course = a;
    }
  })
  if (!course) return <div>loading....</div>;

  return (
    <div style={{ marginTop: 130 }}>
      <Card variant="outlined" style={{ marginTop: 10, minHeight: 200, marginRight: 20, width: 300, padding: 10, borderRadius: 10 }}>
        <div>
          <Typography align="center">Update course details</Typography>
        </div>
        <TextField  fullWidth onChange={(e) => setTitle(e.target.value)} label={"Title"} variant={"outlined"} />
        <br /><br />
        <TextField  fullWidth onChange={(e) => setDescription(e.target.value)} label={"Description"} variant={"outlined"} />
        <br /><br />
        <TextField  fullWidth onChange={(e) => setImageLink(e.target.value)} label={"Image Link"} variant={"outlined"} />
        <br /><br />
        <TextField  fullWidth onChange={(e) => setPrice(e.target.value)} label={"Price"} variant={"outlined"} />
        <br /><br />
        <Button size="large" variant={"outlined"} onClick={() => {
          fetch(`${url}/${courseId}`, {
            method: 'PUT',
            body: JSON.stringify({
              title,
              description,
              imageLink,
              price,
              published: true
            }),
            headers: {
              "Content-type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token")
            }
          }).then((res) => {
            res.json().then((data) => {
              let updatedCourses = courses.map(c => c.id === parseInt(courseId) ? {
                ...c,
                title,
                description,
                imageLink,
                published: true
              } : c);
              setCourses(updatedCourses);
              alert("Course updated successfully");
              console.log("data : " + data);
            })
          })
        }}>Update Course</Button>
      </Card>
    </div>
  );
}

export default Course;