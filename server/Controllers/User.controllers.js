const User = require('../Models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    login: (req, res) => {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "Username or password missing!"});
        }
        User.findOne({email: email})
            .then(result => {

                if(!result){return res.status(401).json({message: "No user found!"})}

                bcrypt.compare(password, result.password)
                .then(match => {

                    if(!match) return res.status(401).json({message: "Password not matching!"})
    
                    const accessToken = jwt.sign({
                        "email": result.email
                    }, process.env.ACCESS_SECRET_KEY, {expiresIn: '4m'});

                    const refreshToken = jwt.sign({
                        "email": result.email
                    }, process.env.REFRESH_SECRET_KEY, {expiresIn: "1h"});

                    res.cookie('userToken', refreshToken, {
                        httpOnly: true,
                        maxAge: 2 * 60 * 1000
                    });

                    res.json({accessToken});
    
                })
                .catch(err => {
                    console.error(err);
                    return res.status(500).json({message: "An error ocurred!", errors: err})
                });

            })
            .catch(err => {
                return res.status(500).json({message: "Internal server error!", error: err})
            });
    },

    logout: (req, res) => {
        const cookies = req.cookies;
        if(!cookies?.userToken){
            return res.status(204).json({message: "No content!"});
        }
        res.clearCookie('userToken', {
            httpOnly: true
        })
        res.json({message: "Cookie cleared!"})
    },

    refresh: (req, res) => {
        const cookies = req.cookies;

        if(!cookies?.userToken){return res.status(401).json({message: "No userToken!"})}

        const refreshToken = cookies.userToken;

        jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, 
            (err, decoded) => {
                if(err){return res.status(401).json({message: "Verification failed!"})}

                User.findOne({email: decoded.email})
                    .then(result => {
                        if(!result){res.status(401).json({message: "No user found!"})}

                        const accessToken = jwt.sign(
                            {
                                "email": result.email
                            },
                            process.env.ACCESS_SECRET_KEY,
                            {expiresIn: "10s"}
                        )

                        res.json({accessToken});
                    })
                    .catch(err => {
                        res.status(500).json({message: "Internal server error!", errors: err})
                    })
            })
    },

    register: (req, res) => {
        User.create(req.body)
            .then(result => {
                res.json({message: "Registration successful!", data: result});
            })
            .catch(err => {
                return res.status(400).json({message: "Data not correct!", error: err})
            })
    }
}