const { ApolloServer } = require("apollo-server");
const typeDefs = require("./db/schema.graphql");
const resolvers = require("./db/resolvers");
const conectDB = require("./config/db");

conectDB();

//server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//run server
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`server is running in ${url}`);
});
