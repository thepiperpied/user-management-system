import {
    v1 as neo4j
} from 'neo4j-driver';

var driver = neo4j.driver("bolt://db:7687", neo4j.auth.basic("neo4j", "_^p7dHe*hJXp7aGd"));

var session = driver.session();

export default {
    Query: {
        user: (_, {
            username,
            password
        }) => {
            let query = "MATCH (u:User) WHERE u.username = $username return u { .username, .supervisorId, .active, .createdBy, .createdDate, profile: [(u) -[Profile]-> (p:Profile) | p { .firstName, .middleName, .lastName, .phoneNumber, .emailId, .bio, .gender, .religion, .category, .nationality, .dateOfBirth }] } AS data;";

            let result = session.run(query, {
                username
            }).
            then(result => {
                session.close();
                return result.records.map(record => {
                    return record.get("data");
                })
            });
            return result;
        }
    }
};

// let query2 = `
//       MATCH (u:User) WHERE u.username = $username return u { .username, .supervisorId, .active, .createdBy, .createdDate, profile: [(u) -[Profile]-> (p:Profile) | p { .firstName, .middleName }] } AS data;

//       CREATE (u:User { username: "shreyansh", supervisorId: "saurbh-jaiswal", active: true, createdBy: "sneha", createdDate: "12/2/2015 11:12" })
//       RETURN u

//       MATCH (b:User {username : "shreyansh"})
//       MERGE p = (a:Profile {firstName: "Shreyansh", middleName: "Kumar", lastName: "Mehta", phoneNumber: 6394875958, emailId: "shrey.binary@gmail.com", bio: "I'm Great", gender: "Male", religion: "Hindu", category: "GEN", nationality: "Indian", dateOfBirth: "07/10/1999"}) <-[c:PROFILE]- (b)
//       RETURN p
//       `;