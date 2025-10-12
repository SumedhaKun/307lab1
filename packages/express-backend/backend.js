import express from "express";
import cors from "cors";
import userServices from "./models/users-services.js";
  
const { addUser, getUsers, findUserById, deleteUser } = userServices;
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
  
app.get("/users", async (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  let result;
  if (name != undefined && job != undefined) {
    result = await getUsers(name, job)
  } 
  else if (job != undefined) {
    result = await getUsers(null,job);
  }
  else if (name!=undefined) {
    result = await getUsers(name)
  }
  else {
    result = await getUsers()
  }
  res.send({"users": result});
});

app.get("/users/:id", async (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = await findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});


app.delete("/users/:id", async (req, res) => {
  const id = req.params["id"]; 
  let user = await deleteUser(id)
  if (user == undefined) {
    res.status(404).send("Resource not found")
  }
  else {
    res.status(204).send();
  }
})

  
app.post("/users", async (req, res) => {
  const userToAdd = req.body;
  const addedUser = await addUser(userToAdd);
  res.status(201).send(addedUser);
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});