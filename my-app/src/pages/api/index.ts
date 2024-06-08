

import type { NextApiRequest, NextApiResponse } from "next";

import express,{ Request as ExpressRequest, Response, NextFunction } from 'express';

require('dotenv').config()

const app = express();
import cors from "cors";
app.use(cors());


const port = process.env.PORT
const SECRET = process.env.SE;
const mongId = process.env.MONG;
let role = "";

interface Data{
    msg : string
}

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';



interface UserDocument extends Document {
    username: string;
    password: string;
    purchasedCourses: string[];
  }
  
  interface AdminDocument extends Document {
    username: string;
    password: string;
  }
  
  interface CourseDocument extends Document {
    title: string;
    description: string;
    price: number;
    imageLink: string;
    published: boolean;
  }
  
  const userSchema = new mongoose.Schema<UserDocument>({
    username: String,
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Courses' }]
  });
  
  const adminSchema = new mongoose.Schema<AdminDocument>({
    username: { type: String, unique: true },
    password: String
  });
  
  const courseSchema = new mongoose.Schema<CourseDocument>({
    title: String,
    description: String,
    price: { type: Number, default: 100 },
    imageLink: String,
    published: { type: Boolean, default: true }
  });
  
  const User = mongoose.model<UserDocument>('User', userSchema);
  const Admin = mongoose.model<AdminDocument>('Admin', adminSchema);
  const Course = mongoose.model<CourseDocument>('Courses', courseSchema);
  
  mongoose.connect(mongId, { dbName: 'courses', useNewUrlParser: true, useUnifiedTopology: true });
  

  interface RequestWithUser extends ExpressRequest {
    user?: any; // Define the 'user' property
  }
  
  function authenticateJwt(req: RequestWithUser, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    console.log("token :: " + authHeader)
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
          res.status(403).send({ msg: "Unauthorized access: " + err });
        } else {
          // Add decoded user information to the request object
          req.user = decoded;
          console.log(req.user);
          next();
        }
      });
    } else {
      res.status(401).json({ msg: "No token provided" });
    }
  }
  

app.get("/me", authenticateJwt, (req  : RequestWithUser, res ) => {
console.log("hiiiiiii")
console.log(req.user) // this is sending an object having username and role
  res.status(200).send(req.user)
})

// app.get("/user/me", authenticateJwt, (req, res) => {

//   res.status(200).send(req.user)
// })
//"here"

// Admin routes
app.post('/admin/signup', async (req, res) => {
  console.log("signup")
  

  var { username, password } = req.body;
  var admin = await Admin.findOne({ username })
  if (admin) {
    res.status(403).json({ message: 'admin already exists' });
  } else {
    admin = new Admin({
      username: username,
      password: password
    });
    admin.save();
    const payload = jwt.sign({ username: username, role: "admin" }, SECRET, { expiresIn: '1h' })
    role = "admin"
    res.status(200).send({
      message: "User created successfully",
      token: payload,
    });
  }
});

app.post('/admin/login', async (req, res) => {
  // logic to log in admin
  role = "admin"
  var { username, password } = req.body;
  var admin = await Admin.findOne({ username: username })
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, { expiresIn: '1h' });
    console.log("hi")
    role = "admin"
    res.json({ message: 'Admin login succesfully', token });
  } else {
    console.log("not found")
    res.status(404).json({ message: 'Admin not found' });
  }
});

app.post('/admin/courses', authenticateJwt, async (req, res) => {
  // logic to create a course
  var { title, description, imageLink } = req.body;

  const course = new Course({ title: title, description: description, imageLink: imageLink })
  await course.save();
  res.json({ message: 'Course created successfully', courseId: course.id });

});

app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
  // logic to edit a course
  var courseId = req.params.courseId
  var course = await Course.findOne({ _id: courseId })
  if (course) {
    course.title = req.body.title
    course.description = req.body.description
    course.imageLink = req.body.imageLink
    course.price = req.body.price
    await course.save();
    res.json({ message: 'Course updated successfully', course: course });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }

});

app.get('/admin/courses', authenticateJwt, async (req, res) => {
  // logic to get all courses

  var courses = await Course.find({})
  // console.log(courses)
  res.json(courses);
});

// User routes
app.post('/users/signup', async (req, res) => {
  // logic to sign up user
  var { username, password } = req.body;
  var user = await User.findOne({ username: username })
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  }
  const newUser = new User({ username, password });
  await newUser.save();
  const token = jwt.sign({ username, role : "user"}, SECRET, { expiresIn: '1h' });
  res.json({ message: 'User created successfully', token });
});

app.post('/users/login', async (req, res) => {
  // logic to log in user
  var { username, password } = req.body;
  var user = await User.findOne({ username: username })
  if (user) {
    const token = jwt.sign({ username , role : "user"}, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User login succesfully', token });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.get('/user/courses', authenticateJwt, async (req, res) => {
  // logic to list all courses
  var courses = await Course.find({ published: true })
  // console.log(courses)
  res.json(courses);
});

// const { ObjectId } = require('mongodb');

app.post('/users/courses/:courseId', authenticateJwt, async (req:RequestWithUser, res) => {
  const course = await Course.findById(req.params.courseId);
  // console.log(course);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});



app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
  // logic to view purchased courses
  // console.log("i am in")
  const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
  //console.log("user :"+user)
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});