const app = require('../src/app');
const authController = require('../src/controllers').auth;
const db = require('../models');
const User = db.User;
const { expect } = require('chai');
const helpers = require('./test-helpers');
const { sign } = require('jsonwebtoken');

describe('Auth Endpoints', () => {
    const testUsers = helpers.makeUsersArray();
    const testUser = testUsers[0];

    before('clean the table', () => db.query('TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE'));
    
    afterEach('cleanup', () => db.query('TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE' ));

    describe('Sign up endpoint', () => {

        const requiredFields = ['username', 'password', 'email'];

        requiredFields.forEach(field => {
            const signupAttemptBody = {
                username: testUser.username,
                password: testUser.password,
                email: testUser.email
            }

            it(`responds 400 required error if ${field} is missing`, () => {
                delete signupAttemptBody[field];

                return supertest(app)
                    .post('/signup')
                    .send(signupAttemptBody)
                    .expect(400, {
                        error: {
                            message:`Request body must include a ${field} value`
                        }
                    })
            })
        })

        it('responds 400 invalid username if user already exists', async () => {
            await helpers.seedUsers(testUsers);

            const signupAttemptBody = {
                username: testUser.username,
                password: testUser.password,
                email: testUser.email
            }

            return supertest(app)
                .post('/signup')
                .send(signupAttemptBody)
                .expect(400, {
                    error: {
                        message: "Username already taken"
                    }
                })
        })
        it('responds 400 invalid error if username is too short', () => {
            const signupAttemptBody = {
                username: 'test',
                password: testUser.password,
                email: testUser.email
            }

            return supertest(app)
                .post('/signup')
                .send(signupAttemptBody)
                .expect(400, {
                    error: {
                        message: `'username' must be at least 6 characters in length`
                    }
                })
        })
        it('responds 400 invalid error if email format is invalid', () => {
            const signupAttemptBody = {
                username: testUser.username,
                password: testUser.password,
                email: "wrong"
            }

            return supertest(app)
                .post('/signup')
                .send(signupAttemptBody)
                .expect(400, {
                    error: {
                        message: 'Request body must include a valid email address'
                    }
                })

        })
        context('password is invalid', () => {
            const signupAttemptBody = {
                username: testUser.username,
                password: '',
                email: testUser.email
            }   
            it('responds 400 because password is too short', () => {
                signupAttemptBody.password = 'short'

                return supertest(app)
                .post('/signup')
                .send(signupAttemptBody)
                .expect(400, {
                    error: {
                        message: 'Password must be longer than 8 characters'
                    }
                })

            })

            it('responds 400 because password is too long', () => {
                signupAttemptBody.password = 'once upon a time in a kingdom very far away there was a password that was just too long'

                return supertest(app)
                .post('/signup')
                .send(signupAttemptBody)
                .expect(400, {
                    error: {
                        message: 'Password must be less than 72 characters'
                    }
                })
            })

            it('responds 400 because password starts with empty space', () => {
                signupAttemptBody.password = " thisIsWrong!1";

                return supertest(app)
                .post('/signup')
                .send(signupAttemptBody)
                .expect(400, {
                    error: {
                        message: 'Password must not start or end with empty spaces'
                    }
                })
            })

            it('responds 400 because password ends with empty space', () => {
                signupAttemptBody.password = "thisIsAlsoWrong!1 ";

                return supertest(app)
                .post('/signup')
                .send(signupAttemptBody)
                .expect(400, {
                    error: {
                        message: 'Password must not start or end with empty spaces'
                    }
                })
            })
           
            it('responds 400 because password has no uppercase characters', () => {
                signupAttemptBody.password = 'thisiswrong!1';

                return supertest(app)
                .post('/signup')
                .send(signupAttemptBody)
                .expect(400, {
                    error: {
                        message: 'Password must contain 1 upper case, lower case, number and special character'
                    }
                })
            })

            it('responds 400 because password has no lowercase characters', () => {
                signupAttemptBody.password ='THISISWRONGANDLOUD!1';

                return supertest(app)
                .post('/signup')
                .send(signupAttemptBody)
                .expect(400, {
                    error: {
                        message: 'Password must contain 1 upper case, lower case, number and special character'
                    }
                })
            })

            it('responds 400 because password has no numbers', () => {
                signupAttemptBody.password = 'thisIsStillWrong!';

                return supertest(app)
                .post('/signup')
                .send(signupAttemptBody)
                .expect(400, {
                    error: {
                        message: 'Password must contain 1 upper case, lower case, number and special character'
                    }
                })
            })

           it('responds 400 because password has no special characters', () => {
                signupAttemptBody.password = 'thisIsWrongToo1';

                return supertest(app)
                .post('/signup')
                .send(signupAttemptBody)
                .expect(400, {
                    error: {
                        message: 'Password must contain 1 upper case, lower case, number and special character'
                    }
                })
           })
        })
        it('responds 201', () => {

            const newUser = {
                username: testUser.username,
                password: testUser.password,
                email: testUser.email,

            }

            const expectedUser = {
                ...newUser,
                id: 1,
                role: null,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }

            return supertest(app)
                .post('/signup')
                .send(newUser)
                .expect(201)
        })
    })
    describe('Sign in endpoint', () => {
        it('responds 400 error if required fields missing', () => {

        })
        it('responds 401 unauthorized if username does not exist', () => {

        })
        it('responds 401 unauthorized if password does not match', () => {

        })
        it('responds 200 with jwt if signin is successful', () => {

        })
    })
})

describe('Protected Endpoints', () => {
    it('returns 401 unauthorized if attempting to access protected endpoint without token', () => {
        
    })
})