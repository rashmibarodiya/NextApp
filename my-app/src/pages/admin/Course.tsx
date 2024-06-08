import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Card, Typography, TextField, Button } from "@mui/material";
import { courseState, CourseType } from "../state/Course";
import apiURl from "../url"
// Define TypeScript interfaces for the props
interface CourseCardProps {
  courseId: string;
}

interface UpdateCardProps {
  courseId: string;
  url: string;
}

function Course() {
  const router = useRouter();
  const { courseId } = router.query;
  const url = `${apiURl}admin/courses`;

  const setCourses = useSetRecoilState(courseState);

  useEffect(() => {
    if (courseId) {
      fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }).then((res) => {
        res.json().then((data) => {
          setCourses(data);
        });
      });
    }
  }, [setCourses, url, courseId]);

  return (
    <div style={{ display: "flex", justifyContent: "space-around", marginTop: '100px' }}>
      {courseId && <CourseCard courseId={courseId as string} />}
      {courseId && <UpdateCard courseId={courseId as string} url={url} />}
    </div>
  );
}

function CourseCard({ courseId }: CourseCardProps) {
  const courses = useRecoilValue(courseState);
  const course = courses.find(a => a._id === courseId);

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <Card variant="outlined" style={{ marginTop: 10, minHeight: 200, marginRight: 20, width: 300, padding: 10 }}>
        <Typography align="center">{course.title}</Typography>
        <Typography align="center">{course.description}</Typography>
        <img src={course.imageLink} style={{ width: '100%', height: 300 }} alt="Course" />
        <Typography align="left">Price - ${course.price}</Typography>
      </Card>
    </div>
  );
}

function UpdateCard({ courseId, url }: UpdateCardProps) {
  const [courses, setCourses] = useRecoilState(courseState);
  const course = courses.find(a => a._id === courseId);

  const [title, setTitle] = useState(course?.title || '');
  const [description, setDescription] = useState(course?.description || '');
  const [imageLink, setImageLink] = useState(course?.imageLink || '');
  const [price, setPrice] = useState(course?.price.toString() || '');

  if (!course) return <div>Loading...</div>;

  return (
    <div style={{ marginTop: 130 }}>
      <Card variant="outlined" style={{ marginTop: 10, minHeight: 200, marginRight: 20, width: 300, padding: 10, borderRadius: 10 }}>
        <Typography align="center">Update course details</Typography>
        <TextField fullWidth value={title} onChange={(e) => setTitle(e.target.value)} label="Title" variant="outlined" />
        <br /><br />
        <TextField fullWidth value={description} onChange={(e) => setDescription(e.target.value)} label="Description" variant="outlined" />
        <br /><br />
        <TextField fullWidth value={imageLink} onChange={(e) => setImageLink(e.target.value)} label="Image Link" variant="outlined" />
        <br /><br />
        <TextField fullWidth value={price} onChange={(e) => setPrice(e.target.value)} label="Price" variant="outlined" />
        <br /><br />
        <Button size="large" variant="outlined" onClick={() => {
          fetch(`${url}/${courseId}`, {
            method: 'PUT',
            body: JSON.stringify({
              title,
              description,
              imageLink,
              price: parseFloat(price),
              published: true
            }),
            headers: {
              "Content-type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token")
            }
          }).then((res) => {
            res.json().then((data) => {
              const updatedCourses = courses.map(c => c._id === courseId ? {
                ...c,
                title,
                description,
                imageLink,
                price: parseFloat(price),
                published: true
              } : c);
              setCourses(updatedCourses);
              alert("Course updated successfully");
            });
          });
        }}>Update Course</Button>
      </Card>
    </div>
  );
}

export default Course;
