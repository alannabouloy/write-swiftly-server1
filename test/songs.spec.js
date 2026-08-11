const app = require('../src/app');
const songsController = require('../src/controllers/songs.controller');
const db = require('../models');
const Song = db.Song;
const { expect } = require('chai');
const helpers = require('./test-helpers');
const supertest = require('supertest');


describe('Songs endpoints', () => {
    const testSongs = helpers.makeSongArray();
    const testSong = testSongs[0];

    before('clean the table', () => db.query('TRUNCATE TABLE "Songs" RESTART IDENTITY CASCADE'));
    afterEach('clean the table', ()=> db.query('TRUNCATE TABLE "Songs" RESTART IDENTITY CASCADE'));

    describe('/songs endpoint', () => {

        //Unhappy Path
        it('responds 404 when no songs in list', () => {
            return supertest(app)
                .get('/songs')
                .expect(404, {error: 'No Songs Found'})
        });
        //Happy Path
        it('responds 200 and returns a list of songs', async ()=> {
            await helpers.seedSongs(testSongs);

            return supertest(app)
                .get('/songs')
                .expect(200, testSongs);
        });

    });

    describe('/songs:title endpoint', () => {
        //Unhappy Path
        it('responds 404 when no song matches title given', ()=> {});
        it('responds 400 when invalid request', ()=> {});

        //Happy Path
        it('responds 200 and returns song details', ()=> {});
    });

    describe('/songs/add endpoint', ()=> {
        //Unhappy Paths
        it('responds 401 Unauthorized when unauthorized access is attempted', () => {});
        it('responds 400 invalid request when request is invalid', ()=> {});

        //Happy Path
        it('responds 201 when song successfully added ', ()=> {});
    });
});
/* 
TODO
- songList
    - Happy Path:
        - Returns all songs in list
    - Unhappy Path:
        - If no songs, return empty 404
        - If invalid request, return error
- findSong
    - Happy Path:
        - Returns song details
    - Unhappy Path:
        - If can't find song, return 404 error
        - If invalide request, return error
- addSong
    - Happy Path:
        - If authorized and valid, return 201 with song details
     - Unhappy Path:
        - If unauthorized, return 401 error
        - If invalid request, return 400 error
*/
