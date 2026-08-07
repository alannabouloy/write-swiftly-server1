const db = require('../../models');
const { JWT_SECRET } = require('../config');
const User = db.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.signUp = ( req, res, ) => {
    return User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync( req.body.password, 8)
    })
        .then( newUser => {
            res.status(201).send(newUser);
        })
        .catch(error => {
            res.status(500).send(error);
        })
}

exports.signIn = (req, res ) => {
    const signInError = {
        error: {
            message: "Invalid username or password"
        }
    };
    return User.findOne({ where: { username: req.body.username }})
        .then( user => {
            if(!user){
                return res.status(401).send(signInError);
            }
            const validPassword = bcrypt.compareSync( req.body.password, user.password);
            if(!validPassword){
                return res.status(401).send(signInError);
            }
            const token = jwt.sign( 
                { id: user.id }, 
                JWT_SECRET, 
                { expiresIn: 86400 }
            );
            res.status(200).send({
                id: user.id,
                username: user.username,
                accessToken: token
            });
        })
        .catch(error => {
            res.status(500).send(error);
        });
}

