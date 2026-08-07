const app = require('../src/app');
const songsController = require('../src/controllers/songs.controller');
const db = require('../models');
const Song = db.Song;
const { expect } = require('chai');
const helpers = require('./test-helpers');
const supertest = require('supertest');

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