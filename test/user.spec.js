const app = require('../src/app');
const usersController = require('../src/controllers/users.controller');
const db = require('../models');
const User = db.User;
const { expect } = require('chai');
const helpers = require('./test-helpers');
const supertest = require('supertest');

describe('Users endpoints', () => {
    const testUsers = helpers.makeUsersArray();
    const testUser = testUsers[0];

    before('clean the table', () => db.query('TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE'));
    afterEach('clean the table', ()=> db.query('TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE'));

    describe('/users endpoint', () => { //need to decide if this path should require an admin level access. if so then need to test that as well
        //Unhappy Path
        it('returns 404 when no users in table', () => {});
        //Happy Path
        it('returns 200 and list of users in table', () => {});
    });

    describe('/users:userId', ()=> {
        //Unhappy Path
         it('returns 401 unauthorized if request lacks proper permissions', () => {});
         it('returns 404 if no such user exists', () => {});
        //Happy Path
        it('returns 200 and user', () => {});
    })

})
/* 
TODO
Happy Path
    - If there is a user, then it will return user info
Unhappy Path
    - If no user exists, it will return 404
    - If the request is unauthorized it will return 401
*/