import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express()
const client = new PrismaClient()

app.use(express.json())


app.get("/", (_req, res) => {  // A landing page of our API to test if our port configuration is working.
    res.send("<h1>You've unlocked the Blog post API</h1>")
})

// Get all users
app.get("/users", async(req, res) =>{
    try {
      const users = await client.user.findMany();
      res.status(200).json(users)
    } catch (e) {
      res.status(500).json({message: "Something went wrong"})
    } 
}) 

// Create a user
app.post("/users", async (req, res) => {
  try {
    const {firstName, lastName, emailAddress, userName} = req.body;
    const newUser = await client.user.create({
      data: {
        firstName,
        lastName,
        emailAddress,
        userName
      }
    })
    res.status(201).json(newUser)
  } catch (e) {
    res.status(500).json({message: "Something went wrong"})
  }
})








// Starting server/ Port configuration
const port = process.env.PORT || 3300;
app.listen(port, () =>{
    console.log(`App is running on port ${port}` );
});