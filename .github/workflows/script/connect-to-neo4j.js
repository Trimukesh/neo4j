const neo4j = require('neo4j-driver');

const uri = process.env.NEO4J_URI;
const user = process.env.NEO4J_USER;
const password = process.env.NEO4J_PASSWORD;

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

const session = driver.session();

session
  .run('MATCH (n) RETURN count(n) as count')
  .then(result => {
    console.log(result.records[0].get('count'));
  })
  .catch(error => console.error(error))
  .finally(() => {
    session.close();
    driver.close();
  });
