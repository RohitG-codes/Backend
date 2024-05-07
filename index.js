import express from "express";
import userRouter from "./routes/user.js";
import logResReq from "./middleware/index.js";
import connectionDB from "./connection.js";

const app = express();
const PORT = 8000;

connectionDB(
  "mongodb+srv://rohitgupta20010412:3XqOMeuZD1xQ73Xf@tutorialmongodb.iqblrvg.mongodb.net/"
)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log("error", err);
  });

app.use(express.urlencoded({ extended: false }));
app.use(logResReq("log.txt"));
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log("server is running at port number ", PORT);
});

// import express, { json } from "express";
//import users from "./MOCK_DATA.json" assert { type: "json" };
// import fs from "fs";
//import mongoose from "mongoose";

// import routerrr from "./routes/user";

// import logResReq from "./middleware";
// app.use(logResReq("log.txt"));

// import connectionDB from "./connection";
// connectionDB(
//   "mongodb+srv://rohitgupta20010412:3XqOMeuZD1xQ73Xf@tutorialmongodb.iqblrvg.mongodb.net/"
// );
//For Database
// mongoose
//   .connect(
// "mongodb+srv://rohitgupta20010412:3XqOMeuZD1xQ73Xf@tutorialmongodb.iqblrvg.mongodb.net/"
//   )
//   .then(() => console.log("database connected successfully"))
//   .catch((e) => {
//     console.log("database not connected", e);
//   });

// //creating database schema
// const userSchema = new mongoose.Schema({
//   first_name: {
//     type: String,
//     require: true, //you have to provide first name
//   },
//   last_name: {
//     type: String,
//     require: false, //if you don't provide the last name it's ok
//   },
//   email: {
//     type: String,
//     require: true,
//     unique: true, //you can't have more than one same email
//   },
//   job_title: {
//     type: String,
//     //by default require will be false
//   },
//   gender: {
//     type: String,
//     //by default require will be false
//   }
// },
// {
//   timestamps: true
// });

// const User = mongoose.model("user", userSchema);

// For APIS
// const app = express();

//middleware or plugin -> express don't know how to handle the data coming from post request,that's why we have to use this middleware
// middleware1
// app.use(express.urlencoded({ extended: false }));

// middleware2
// app.use((req, res, next) => {
//   // fs.appendFile('log.txt',`${Date.now()} : ${req.method} : ${req.path}`,(err,date)=>{
//   //   next();
//   // })
//   const now = new Date();
//   fs.appendFile(
//     "log.txt",
//     `Date = ${(now.getDate() + "").padStart(2, "0")}/${(
//       now.getMonth() +
//       1 +
//       ""
//     ).padStart(
//       2,
//       "0"
//     )}/${now.getFullYear()} : Time = ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}: HTTP Method = ${
//       req.method
//     } : Requested Path = ${req.path} : IP Address = ${req.ip}\n`,
//     (err, date) => {
//       next();
//     }
//   );
//   //console.log("Hello from  middleware1")
//   //return res.json({msg: "hi i am middleware1"}) //here the midlleware2 will send the response back to the user,not forwaring to the next() func
//   //next(); //if you don't call the next() function,you will not get the response
//   //cause the middleware2 will not forward the yser request to the next function
//   //return res.send("hey middleware2"); //here the request will not go forward,now the request will not go to middleware3
// });

//middleware3
//app.use((req,res,next)=>{
//console.log("Hello from  middleware2")
//return res.send("hey middleware3"); //here the request will not go forward
//next();//express will automatically understand the which is the next function
//in this case middleware3 will be the next function of middleware2
//and app.get(...) is the next function of middleware3
//})

//creating a  hybrid server

//for ssr(server side rendering)
// app.get("/users", async(req, res) => {
//   const allDBUsers=await User.find({});
//   const html = `
//   <ul>
//     ${allDBUsers.map((user) => `<li>${user.first_name} : ${user.email}</li>`).join("")}
//   </ul>`;
//   res.send(html);
// });

//  creating REST APIs

//for csr(client side rendering)

//POST method -> creating new user
// app.post("/api/users", async(req, res) => {
//   const body = req.body; // all the data coming from POST request are stored in the 'body'
//   //console.log('Body',body);
//   if (
//     !body ||
//     !body.first_name ||
//     !body.last_name ||
//     !body.email ||
//     !body.job_title ||
//     !body.gender
//   ) {
//     return res
//       .status(400)
//       .json({ msg: "This is a bad request, All fields are required" });
//   }
// users.push({ ...body, id: users.length + 1 });
// fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
//   return res.status(201).json({ status: "success", id: users.length });
//   //when you create or add somethin always use 201 status code not 200,like adding a user or somthing like that
// });
//   const userResult = await User.create({
//     first_name:body.first_name,
//     last_name:body.last_name,
//     email:body.email,
//     job_title:body.job_title,
//     gender:body.gender
//   });
//   console.log("Result : ",userResult);
//   return res.status(201).json({msg:"success" })
// });

//GET method -> getting user data
// app.get("/api/users", async(req, res) => {
//   const allDBUsers=await User.find({});
//   //res.setHeader("X-ServerOwner", "Rohit Gupta"); // Always add " X- " to your custome headers
//   //console.log(req.headers); // " purpose : Learning Node JS " is the added custome header in request object
//   return res.json(allDBUsers);
// });

//dynamic path parameters
// /api/users/:id
// here id is a variable
// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

// //PATCH method -> edit an exixting user with id
// app.patch("/api/users/:id", (req, res) => {
//   return res.json({ status: "pending" });
// });

// //DELETE method -> Delete an exixting user with id
// app.patch("/api/users/:id", (req, res) => {
//   return res.json({ status: "pending" });
// });

//merging the above methods with same path
// app
//   .route("/api/users/:id")
//   .get(async(req, res) => {
//     // const id = Number(req.params.id);
//     // const user = users.find((user) => user.id === id);
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ msg: "User not Found" });
//     }
//     return res.json(user);
//   })
//   // .patch((req, res) => {
//     // return res.json({ status: "pending" });
//   // })
//   .patch(async(req, res) => {
//     await User.findByIdAndUpdate(req.params.id, req.body);
//     return res.json({ status: "success" });
//     // const id = Number(req.params.id);
//     // const updatedUserData = req.body; // Assuming the updated data is in the request body
//     // const userIndex = users.findIndex((user) => user.id === id);

//     // if (userIndex !== -1) {
//     //   // Update the user with new data
//     //   users[userIndex] = { ...users[userIndex], ...updatedUserData };
//     //   console.log(users[userIndex]);
//     //   return res.json({ status: "success", user: users[userIndex] });
//     // } else {
//     //   return res
//     //     .status(404)
//     //     .json({ status: "error", message: "User not found" });
//     // }
//   })

// .delete((req, res) => {
//   return res.json({ status: "pending" });
// });
// .delete(async(req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   return res.json({ status: "success" });
// const id = Number(req.params.id);
// const userIndex = users.findIndex((user) => user.id === id);

// if (userIndex !== -1) {
//   // Remove the user from the array
//   const deletedUser = users.splice(userIndex, 1);
//   return res.json({ status: "success", deletedUser: deletedUser[0] });
// } else {
//   return res
//     .status(404)
//     .json({ status: "error", message: "User not found" });
// }
//});
