// SCHEMA TABLES
const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = graphql;

const users = [
  { id: '23', firstName: 'Bill', age: 20 },
  { id: '47', firstName: 'Samantha', age: 31 },
];

// what properties the User type is suppose to have
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  }
});
// We have instructed GQL that every single user will have 
// an id, firstName and age property.

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } }, // arguments for root query
      resolve(parentValue, args) {
        return _.find(users, { id: args.id });
      }
      // give me an id, I will give you back a user
      // resolve function's purpose, goes into db and 
      // finds the actual data we're looking for
    }
  }
});

// We have to give the GraphQL the Root Query. It's where you start 
// to connect to the rest of the Graph (data).

