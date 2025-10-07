import express from "express";
import cors from "cors";

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };
  
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const findUserByName = (name, lis) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

const findUserByJob = (job, lis) => {
  return lis.filter(
    (user) => user["job"] === job
  );
}


  
  app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    var result = users["users_list"];
    console.log(result)
    
    if (name != undefined) {
      result = findUserByName(name, result);  
    } 
    if (job != undefined) {
      result = findUserByJob(job, result);
    }
    res.send({"users": result});
  });

  const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const removeUser = (user) => {
  let index = users["users_list"].indexOf(user)
  users["users_list"].splice(index,1);

}

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; 
  let user = findUserById(id);
  console.log(user);
  if (user == undefined) {
    res.status(404).send("Resource not found")
  }
  removeUser(user);
  if (findUserById(id) === undefined) {
    res.status(204).send();
  }
})

const addUser = (user) => {
    let id = Math.floor(Math.random() * 100000)
    user["id"] = id;
    users["users_list"].push(user);
    return user;
  };
  
  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    let addedUser=addUser(userToAdd);
    res.status(201).send(addedUser);
  });

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});