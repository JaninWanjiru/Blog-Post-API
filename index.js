import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express()
const client = new PrismaClient()


app.get("/", (req, res) => {  // A landing page of our API to test if our port configuration is working.
    res.send("<h1>You've unlocked the Blog post API</h1>")
})


// Starting server/ Port configuration
const port = process.env.PORT || 3300;
app.listen(port, () =>{
    console.log(`App is running on port ${port}` );
});