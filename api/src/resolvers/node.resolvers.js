import {  v1 as neo4j } from 'neo4j-driver';

var driver = neo4j.driver("bolt://db:7687", neo4j.auth.basic("neo4j", "_^p7dHe*hJXp7aGd"));

var session = driver.session();

export default {
  Query: {
    university: (_, { id }) => {
      let query = "MATCH (u:University) WHERE u.id = $id return u;";
      let result = session.run(query, { id }).
      then(result => {
        return result.records.map(record => {
          return record.get("u").properties
        })
      });

      return result;
    }
  }
};  