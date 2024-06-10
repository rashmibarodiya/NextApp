import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username :String,
    password:String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Courses' }]
})

const adminSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
  })
  const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: { type: Number, default: 100 },
    imageLink: String,
    published: { type: Boolean, default: true }
  });
  
  
  // create models for mongoose
  
 export const User = mongoose.model('User', userSchema);
 export const Admin = mongoose.model('Admin', adminSchema);
 export const Course = mongoose.model('Courses', courseSchema);
  
  // connect to MongoDB
  
  mongoose.connect(process.env.MONG!,
   { dbname: 'courses' }
  );
  
