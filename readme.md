# Postify

Simple blogging app

- mongodb for database
- nestjs with graphql for backend
- nextjs for frontend
- MUI for UI

I am aiming to have a simple app where

- homepage displays paginated posts with info and readme for post details
- posts belong to a category
- users can register and login
- logged in users can create posts, categories, comment on posts and update their own posts

## backend

```sh
npm i -g @nestjs/cli

nest new backend

nest g resource users


npm install @nestjs/graphql graphql apollo-server-express @nestjs/mongoose mongoose
npm install @nestjs/passport passport passport-jwt @types/passport-jwt jsonwebtoken bcrypt

npm install --save @nestjs/jwt
```
