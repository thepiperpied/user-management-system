 export const typeDefs = `
 
 type University {
    id: ID
    entry: ID
  }

  type Node {
    id: ID!
    type: String!
    name: String!
    parents: [Node]
    childs: [Node]
    siblings: [Node]
  }
  
  type Query {
    university(id: ID!): [University]
    universities: [University]
  }
  `