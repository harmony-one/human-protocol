const neo4j = require('neo4j-driver');

const uri = "neo4j+s://d4377322.databases.neo4j.io";
const user = "neo4j";
const password = "P3PE9dPl-649Lf6s4pQwm1t7VN_00LruYIRE6XQOFBk";

export const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
