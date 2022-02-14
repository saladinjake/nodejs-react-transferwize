import async from 'async';
import debug from 'debug';
import pool from './connection.db';
import dummyData from '../dummyData';


const userQueryText = 'INSERT INTO users (email, firstName, lastName, password, type, isAdmin) values ($1, $2, $3, $4, $5, $6) returning *';
const accountQueryText = 'INSERT INTO accounts (accountNumber, owner, type, status, balance) values ($1, $2, $3, $4, $5) returning *';
const transactionQueryText = 'INSERT INTO transactions (accountNumber, cashier, transactionType, amount, oldBalance, newBalance,donor, receipient) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *';

async function userSeeder1(callback) {
  await pool.query(userQueryText, dummyData.users[0], (err) => {
    if (err) debug('pg/seeder')(err);
    callback(null, 'Inserted First User');
  });
}

async function userSeeder2(callback) {
  await pool.query(userQueryText, dummyData.users[1], (err) => {
    if (err) debug('pg/seeder')(err);
    callback(null, 'Inserted Second User');
  });
}

async function userSeeder3(callback) {
  await pool.query(userQueryText, dummyData.users[2], (err) => {
    if (err) debug('pg/seeder')(err);
    callback(null, 'Inserted Third User');
  });
}

async function userSeeder4(callback) {
  await pool.query(userQueryText, dummyData.users[3], (err) => {
    if (err) debug('pg/seeder')(err);
    callback(null, 'Inserted Forth User');
  });
}

async function accountSeeder1(callback) {
  await pool.query(accountQueryText, dummyData.accounts[0], (err) => {
    if (err) debug('pg/seeder')(err);
    callback(null, 'Inserted First Account');
  });
}

async function accountSeeder2(callback) {
  await pool.query(accountQueryText, dummyData.accounts[1], (err) => {
    if (err) debug('pg/seeder')(err);
    callback(null, 'Inserted Second Account');
  });
}

async function transactionSeeder1(callback) {
  await pool.query(transactionQueryText, dummyData.transactions[0], (err) => {
    if (err) debug('pg/seeder')(err);
    callback(null, 'Inserted First Transaction');
  });
}

async function transactionSeeder2(callback) {
  await pool.query(transactionQueryText, dummyData.transactions[1], (err) => {
    if (err) debug('pg/seeder')(err);
    callback(null, 'Inserted Second Transaction');
  });
}

const tasks = [
  userSeeder1,
  userSeeder2,
  userSeeder3,
  userSeeder4,
  accountSeeder1,
  accountSeeder2,
  transactionSeeder1,
  transactionSeeder2,
];

async.series(tasks, (err, results) => {
  if (err) console.log(err);
  if (results) console.log(results);
});

require("make-runnable")()