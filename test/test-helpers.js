const db = require('../models');
const User = db.User;
const Song = db.Song;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray(){
    return [
        {
            id: 1,
            username: 'testuser1',
            password: 'Test-password1!',
            email: 'testuser1@email.com',
            role: 'admin',
            createdAt: '2029-01-22T16:28:32.615Z'
        },
        {
            id: 2, 
            username: 'testuser2',
            password: 'test-password2',
            email: 'testuser2@email.com',
            role: 'user',
            createdAt: '2029-01-22T16:28:32.615Z'
        },
        {
            id: 3,
            username: 'testuser3',
            password: 'test-password3',
            email: 'testuser3@email.com',
            role: 'user',
            createdAt: '2029-01-22T16:28:32.615Z'
        }
    ];
};

//makeSongArray creates an array of test songs to add to db
function makeSongArray(){
    return [
        {
            id: 1,
            title: 'Tim McGraw',
            storytags: ['hook', 'midpoint', 'thirdPlotPoint'],
            album: 'Debut',
            createdAt: '2029-01-22T16:28:32.615Z',
            updatedAt: '2029-01-22T16:28:32.615Z'

        },
        {
            id: 2,
            title: 'Picture to Burn',
            storytags: ['hook', 'firstPlotPoint','midpoint', 'thirdPlotPoint', 'climax', 'closure'],
            album: 'Debut',
            createdAt: '2029-01-22T16:28:32.615Z',
            updatedAt: '2029-01-22T16:28:32.615Z'
        },
        {
            id: 3,
            title: `You're on Your Own Kid`,
            storytags: ['firstPlotPoint', 'midpoint', 'thirdPlotPoint', 'climax'],
            album: 'Midnights',
            createdAt: '2029-01-22T16:28:32.615Z',
            updatedAt: '2029-01-22T16:28:32.615Z'
        }
    ];
};
//seedUsers function to add testUsers to test db
function seedUsers(users) {
//map through to hash passwords
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }));

    return User.bulkCreate(preppedUsers);
};
    
//seedSongs function to add songs to test db
function seedSongs(songs){
    return Song.bulkCreate(songs);
};
//makeAuthHeader creates auth token for testing


module.exports = {
    makeUsersArray,
    makeSongArray,
    seedUsers,
    seedSongs
};