import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express()
const client = new PrismaClient()

app.use(express.json())


app.get("/", (_req, res) => {  // A landing page of our API to test if our port configuration is working.
    res.send("<h1>You've unlocked the Blog post API</h1>")
});


// Users Endpoints
// Get all users
app.get("/users", async(_req, res) =>{
    try {
      const users = await client.user.findMany();
      res.status(200).json(users)
    } catch (e) {
      res.status(500).json({message: "Something went wrong"})
    } 
}); 

// Get a specific user by Id
app.get("/users/:id", async (req, res) => {
  try {
    const  {id} = req.params
    const user = await client.user.findFirst({
      where: {id},
      include: {posts: true}   //"Include"- gives us all the fields containing all the details of the Post model
    })
    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).json({message: "User not found"})
    }
  } catch (e) {
    res.status(500).json({message: "Something went wrong"})
  }
});

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
    console.log(e);
    res.status(500).json({message: "Something went wrong"})
  }
});


// Posts Endpoints
// Create a new post
app.post("/posts", async (req, res) => {
  try {
    const {title, content, userId} = req.body;
    const newPost = await client.post.create({
      data: {
        title,
        content,
        userId
      }
    })
    res.status(201).json(newPost)
  } catch (e) {
    console.log(e)
    res.status(500).json({message: "Something went wrong"})
  }
})

// Get all posts with user details for each post
app.get("/posts", async (_req, res) => {
  try {
    const posts = await client.post.findMany({
      where: {isDeleted: false},
      include: {user: true}    //"Include"- gives us all the fields containing the details of the User model
    })
    res.status(200).json(posts)
  } catch (e) {
    res.status(500).json({message: "Something went wrong"})
  }
});


// Get a specific post with user details for that post
app.get("/posts/:id", async (req, res) => {
  try {
    const  {id} = req.params
    const post = await client.post.findFirst({
      where: {id},
      include: {user: true}
    })
    if (!post) {
      return res.status(404).json({message: "Post not found"})
    } else {
      return res.status(200).json(post)
    }
  } catch (e) {
    res.status(500).json({message: "Something went wrong"})
  }
});

// Update a post
app.put("/posts/:id", async (req, res) => {
  try {
    const {title, content} = req.body
    const {id} = req.params
    const post = await client.post.update({
      where: {id},
      data: {
          title,
          content
      }
    })
    res.status(200).json(post)
  } catch(e) {
    res.status(500).json({message: "Something went wrong"})
  }
});

// Delete a given post
app.delete("/posts/:id", async (req, res) => {
  try {
    const {id} = req.params
    await client.post.update({
      where: {id},
      data: {isDeleted: true}
    })
    res.status(200).json({message: "Post deleted successfully"})
  } catch(e) {
    res.status(500).json({message: "Something went wrong"})
  }
});

// Starting server/ Port configuration
const port = process.env.PORT || 3300;
app.listen(port, () =>{
    console.log(`App is running on port ${port}` );
});