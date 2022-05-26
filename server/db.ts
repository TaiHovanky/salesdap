import knex from 'knex';

console.log('process env=====', process.env.DB_HOST, process.env.DB_USER, process.env.DB_NAME);

export default knex({
  client: 'pg',
  connection: {
    host : process.env.DB_HOST,
    port : 5432,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  }
});