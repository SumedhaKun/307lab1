// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table"
import Form from "./Form";


function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users"]))
        .catch((error) => { console.log(error); });
    }, [] );

    function updateList(person) { 
      postUser(person)
        .then(() => setCharacters([...characters, person]))
        .catch((error) => {
          console.log(error);
        })
    }

    async function postUser(person) {
      const promise = await fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });

      console.log("------")
      console.log(promise)
  
      return promise;
    }

    async function fetchUsers() {
      const promise = await fetch("http://localhost:8000/users");
      return promise;
    }
      function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      }
      return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />
          <Form handleSubmit={updateList} />
        </div>)
}
export default MyApp;