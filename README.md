```
npm install
npm run dev
```

```
npm run deploy
```

Prisma Accelerate - to establish a connection pooling 

Connection Pooling - Generally in serverless i.e cloudflare workers can be up in any corner of the world, so our database gets connected from every region to support the request. And we dont want our database to get connected from every region, so we make a connection pool that comes in between the database and server and all the request first goes to the connection pool and then it reaches to database.

