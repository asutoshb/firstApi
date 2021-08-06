const express = require('express')



const app = express()

app.use(express.json());
/*
const user = {    
      "id": 1001,
      "first_name": "Test First Name",
      "last_name": "Test Last Name",
      "email": "ydalesco0@test.com",
      "gender": "Genderfluid",
      "ip_address": "164.215.194.36",
      "age": 65
  }
*/

const users = require('./users.json')

app.get("/users", function (request, response) {
    console.log("All Users"+JSON.stringify(users));
    return response.send(users);
})

app.get("/", function (request, response) {
    return response.send("Welcome to Home page");
})

app.post("/users", function (request, response) {
    var user = request.body;
    users.unshift(user);
    console.log("user added successfully"+JSON.stringify(user));
   return response.send(users);
})



app.patch("/users/:id/:user/", function (request, response) {
    var idd = request.params.id;
    var user1 = request.params.user;
    const result = users.find( ({ id }) => id == idd);
    
    result.first_name = user1;

    
    console.log("updated user: " + JSON.stringify(result));
    return response.send(result);
    
})

app.delete("/users/:id/:user", function (request, response) {
    var idd = request.params.id;
    const result = users.find( ({ id }) => id == idd);
    
    for(var i=0; i<users.length; i++) {
        if(users[i] == result)
        {
            delete users[i];
            break;
        }
    }
    console.log("deleted user: " +JSON.stringify(result));
    return response.send(users);

    
    
})



app.listen(2100, ()=>{
    console.log("listening to port 2100");
})