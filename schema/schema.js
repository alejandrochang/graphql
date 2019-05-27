// SCHEMA TABLES
const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  }
})

// what properties the User type is suppose to have
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    lastName: { type: GraphQLString },
    companyId: { type: GraphQLString }
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
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then((resp) => resp.data);
      }
      // give me an id, I will give you back a user
      // resolve function's purpose, goes into db and 
      // finds the actual data we're looking for
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http:localhost:3000/companies/${args.id}`)
          .then((resp) => resp.data);
      }
    }
  }
});

// We have to give the GraphQL the Root Query. It's where you start 
// to connect to the rest of the Graph (data).

module.exports = new GraphQLSchema({
  query: RootQuery
});


// resolve is our playground for fetching data, whether its coming from a data warehouse, db, api call etc.


// For db.json
// whatever key you use you can see the json on web: ex. /users || /companies
// localhost:3000/users || /companies/1/users (All RESTful conventions)