import config from "../config";

const neo4j = require('neo4j-driver');

const uri = config.neo4Graph.uri;
const user = config.neo4Graph.user;
const password = config.neo4Graph.password;

export const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
