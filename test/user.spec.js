const app = require('../src/app');
const usersController = require('../src/controllers/users.controller');
const db = require('../models');
const User = db.User;
const { expect } = require('chai');
const helpers = require('./test-helpers');
const supertest = require('supertest');
/* 
TODO
Happy Path
    - If there is a user, then it will return user info
Unhappy Path
    - If no user exists, it will return 404
    - If the request is unauthorized it will return 401
*/