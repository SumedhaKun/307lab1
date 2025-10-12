import mongoose from "mongoose";
import userModel from "./user.js";
import dotenv from 'dotenv';
dotenv.config();

mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGO_URI, {
  })
  .catch((error) => console.log(error));

async function getUsers(name, job) {
  if (name === undefined && job === undefined) {
    return await userModel.find();
  } else if (name && !job) {
    return await userModel.find({ name: name })
  } else if (job && !name) {
    return await userModel.find({ job: job })
  } else {
    return await userModel.find({ name: name, job:job })
  }
}

async function findUserById(id) {
  return await userModel.findById(id);
}

async function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = await userToAdd.save();
  return promise;
}

async function deleteUser(id) {
    return await userModel.findByIdAndDelete(id);
}



export default {
  addUser,
  getUsers,
  findUserById,
  deleteUser
};