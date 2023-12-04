import mongoose from "mongoose";
// load users schema
import schema from "./schema.js";
// create mongoose model from the schema
const model = mongoose.model("users", schema);
export default model;