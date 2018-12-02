'use strict';

import * as path from "path";
const {
  GraphQLServer
} = require('graphql-yoga');
import { typeDefs } from "./typedefs/index";
import {
  resolvers
} from './resolvers/index';


require('dotenv').config();

const options = {
  port: process.env.NODE_PORT
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({ ...req
  })
});

server.start(options, ({
    port
  }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`,
  ),
)
