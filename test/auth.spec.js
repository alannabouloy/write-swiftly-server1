const app = require('../src/app');
const authController = require('../src/controllers').auth;
const db = require('../models');
const User = db.User;
const { expect } = require('chai');
const helpers = require('./test-helpers');
const { sign } = require('jsonwebtoken');
const supertest = require('supertest');

describe('Auth Endpoints', () => {
    const testUsers = helpers.makeUsersArray();
    const testUser = testUsers[0];

    before('clean the table', () => db.query('TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE'));
    
    afterEach('cleanup', () => db.query('TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE' ));

    describe('Sign up endpoint', () => {

        const requiredFields = ['username', 'password', 'email']; //these wouod be the required fields for signing up as a new user

        requiredFields.forEach(field => {
            const signupAttemptBody = {
                username: testUser.username,
                password: testUser.password,
                email: testUser.email
            }

            it(`responds 400 required error if ${field} is missing`, () => {
                delete signupAttemptBody[field]; //removes the field tested so that we can see error message returned when missing specific field

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

        const requiredFields = ['username', 'password']; //these would be the required fields for signing in as an existing user
        requiredFields.forEach(field => {
            const signinAttemptBody = {
                username: testUser.username,
                password: testUser.password
            }
            it(`responds 400 required error if ${field} is missing`, () => {
                delete signinAttemptBody[field];

                return supertest(app)
                    .post('/signin')
                    .send(signinAttemptBody)
                    .expect(400, {
                        error: {
                            message: `Request body must include a ${field} value`
                        }
                    })
            })
        })
        it('responds 401 unauthorized if username does not exist', async () => {
            await helpers.seedUsers(testUsers);
            const signinAttemptBody = {
                username: "notAUser",
                password: "notAPassword"
            }

            return supertest(app)
                .post('/signin')
                .send(signinAttemptBody)
                .expect(401, {
                    error: {
                        message: 'Invalid username or password'
                    }
                })
        })
        it('responds 401 unauthorized if password does not match', async () => {
            await helpers.seedUsers(testUsers);
            const signinAttemptBody = {
                username: testUser.username,
                password: 'wrongPassword1!'
            }

            return supertest(app)
                .post('/signin')
                .send(signinAttemptBody)
                .expect(401, {
                    error: {
                        message: 'Invalid username or password'
                    }
                })

        })
        it('responds 200 with jwt if signin is successful', async () => {
            await helpers.seedUsers(testUsers);
            const signinAttemptBody = {
                username: testUser.username,
                password: testUser.password
            }

            return supertest(app)
            .post('/signin')
            .send(signinAttemptBody)
            .expect(200)
            .expect(res => {
                expect(res.body.accessToken).to.be.a('string')
                expect(res.body.accessToken.length).to.be.above(0);
            })

        })
    })
})

describe('Protected Endpoints', () => {
    it('returns 401 unauthorized if attempting to access protected endpoint without token', () => {
        
    })
})