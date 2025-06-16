# Blog Post API

This API allows users to create accounts and share blog posts. 

It’s built with **Express JS** for the server, **Prisma ORM** for smooth database interactions, and **PostgreSQL** as the database engine.
I used **ECMAScript Modules (ESM)** syntax to keep things modern and clean.


## Technologies Used

- **Express JS** – Routing and server handling.
- **Prisma ORM** – Managing data models and queries.
- **PostgreSQL** – Database for storing users and posts.
- **Render** – For deploying the API to the cloud. 
- **ECMAScript Modules (ESM)** – Using `import` instead of `require`.
- **Postman** - For testing the API.


## Features
- User registration and retrieval
- Create, read, update, and "soft delete" blog posts
- One-to-many relationship between Users and Posts (one user - many posts)
- Input validation and error handling

## Setup configurations
#### 1. Initialize a new Node.js project
```bash
npm init -y
```
#### 2. Install necessary dependencies
```bash
npm i express
```

#### 3. Install development dependencies
```bash
npm i prisma -D
```
#### 4. Initialize Prisma with PostgreSQL
```bash
npx prisma init --datasource-provider postgresql
```
#### 5. Update the DATABASE_URL in the .env file with your PostgreSQL connection string

#### 6. Define your User and Post models in ***schema.prisma***

```prisma
model User {
  id String @id @default(uuid()) @map("user_id")
  firstName String @map("first_name")
  lastName String @map("last_name")
  emailAddress String @unique @map("email_address")
  userName String @unique @map("user_name")
  posts Post[]
  
  @@map("users")
}
```

```prisma
model Post {
  id String @id @default (uuid()) @map("post_id")
  title String @map("posts_title")
  content String @map("posts_content")
  createdAt DateTime @default(now()) @map("created_at")
  lastUpdated DateTime @updatedAt @map("last_updated")
  isDeleted Boolean @default(false)  @map("is_deleted")
  userId String @map("user_id")
  user User @relation(fields: [userId], references: [id])

  @@map("posts")
}
```
#### 7. Run migrations to create tables in your database
```bash
npx prisma migrate dev --name "create users and posts tables"
```

#### To view your tables using ***Prisma Studio*** GUI, run the command below:
```bash
npx prisma studio
```

## API Endpoints

### Users Endpoints
1. GET `/users` - Fetch all users.

![get users](./images/get%20all%20users.png)

2. GET `/users/:id`- gets a specific user and all their posts.

![get specific](./images/get%20specific%20user.png)

3. GET `/users` -Creates a new user.

![user](./images/user.png)

### Posts Endpoints
1. POST `/posts` - creates a new post.

![post](./images/post.png)

2. GET `/posts` - gets all active posts and user details.

![get all posts](./images/get%20all%20posts.png)

3. GET `/posts/:id` - gets a specific post together with the user details.

![get specific](./images/get%20specific%20post.png)

4. PUT `/posts/:id` - updates the content of a post.

![update post](./images/update.png)

5. DELETE `/posts/:id` - deletes a specific post given the post Id.

![delete post](./images/delete.png)

