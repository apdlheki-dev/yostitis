
import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
  name:String,
  age:String,
  job:String,
  phone:String,
  email:String,
  bio:String,
  image:String
},{timestamps:true});

export default mongoose.models.Person || mongoose.model("Person",PersonSchema);
