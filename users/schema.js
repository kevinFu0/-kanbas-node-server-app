import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
  // String field that is required and unique
    username: { type: String, required: true, unique: true },
    // String field that in required but not unique
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    dob: Date,
    role: {
      type: String,
      // allowed string values
      enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
      default: "USER" },
  },
  { collection: "users" });


export default userSchema;