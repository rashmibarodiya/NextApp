// src/app/editCourse/page.tsx
'use client';

import { useEffect, useState } from "react";
import { Button, Typography, Card, TextField } from "@mui/material";
import { useParams } from "next/navigation"; // You might need to change this based on your router version
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { courseState } from '../store/atom/userState';
import { courseType } from '../types/ty';

interface strType {
  courseId: string;
}

function Course() {
  const { courseId } = useParams() as { courseId: string };
  const url = `/api/admin/update`;

  const setCourses = useSetRecoilState(courseState);

  useEffect(() => {
    fetch(`${url}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then((res) => {
      res.json().then((data: courseType[]) => {
        setCourses(data);
      });
    });
  }, [setCourses, url]);

  return (
    <div style={{ display: "flex", justifyContent: "space-around", marginTop: '100' }}>
      <CourseCard courseId={courseId}></CourseCard>
      <UpdateCard courseId={courseId} url={url}></UpdateCard>
    </div>
  );
}

function CourseCard({ courseId }: strType) {
  const courses = useRecoilValue(courseState);
  const course = courses.find(c => c._id === courseId);

  if (!course) return <div>Loading...</div>;

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

interface UpdateCardProps {
  courseId: string;
  url: string;
}

function UpdateCard({ courseId, url }: UpdateCardProps) {
  const [courses, setCourses] = useRecoilState(courseState);
  const course = courses.find(c => c._id === courseId);

  const [title, setTitle] = useState(course?.title || '');
  const [description, setDescription] = useState(course?.description || '');
  const [imageLink, setImageLink] = useState(course?.imageLink || '');
  const [price, setPrice] = useState(course?.price.toString() || '');

  if (!course) return <div>Loading...</div>;

  return (
    <div style={{ marginTop: 130 }}>
      <Card variant="outlined" style={{ marginTop: 10, minHeight: 200, marginRight: 20, width: 300, padding: 10, borderRadius: 10 }}>
        <div>
          <Typography align="center">Update course details</Typography>
        </div>
        <TextField fullWidth onChange={(e) => setTitle(e.target.value)} label="Title" variant="outlined" value={title} />
        <br /><br />
        <TextField fullWidth onChange={(e) => setDescription(e.target.value)} label="Description" variant="outlined" value={description} />
        <br /><br />
        <TextField fullWidth onChange={(e) => setImageLink(e.target.value)} label="Image Link" variant="outlined" value={imageLink} />
        <br /><br />
        <TextField fullWidth onChange={(e) => setPrice(e.target.value)} label="Price" variant="outlined" value={price} />
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
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          }).then((res) => {
            res.json().then((data) => {
              const updatedCourses = courses.map(c => c._id === courseId ? { ...c, title, description, imageLink, price: parseFloat(price), published: true } : c);
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
