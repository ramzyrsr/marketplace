const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { UserModel } = require('../models/user');

class userController {
    static async signin(req, res) {
        try {
            const { email, password } = req.body;

            const findUser = await UserModel.findOne({
                email: email
            });
    
            if (!findUser) {
                res.json({
                    statusCode: 400,
                    statusText: 'Not Found',
                    message: 'User not found'
                })
                .status(400);
            } else {
                const isPasswordCorrect = await  bcrypt.compare(
                    password,
                    findUser.password
                );
    
                if (isPasswordCorrect) {
                    const payload = {
                        id: findUser.id,
                        nama: findUser.nama,
                        email: findUser.email
                    };
                    
                    jwt.sign(
                        payload,
                        process.env.KEY_SECRET,
                        {
                            expiresIn: "30d",
                        },
                        (err, token) => {
                                res.json({
                                status: 200,
                                data: findUser,
                                token: "Bearer token: " + token,
                            })
                            .status(200);
                        }
                    )}
            }

        } catch (error) {
            res.json({
                statusCode: 500,
                statusText: 'error',
                message: error.message
            })
            .status(500);
        }
    }

    static async register(req, res) {
        try {
            const { nama, email, password } = req.body;

            const findUser = await UserModel.findOne({
                email
            });
    
            if (findUser) {
                res.json({
                    statusCode: 510,
                    statusText: 'Registered',
                    message: 'Email has already regitered'
                })
                .status(510);
            } else {
                const registerUser = await UserModel.create({ ...req.body });

                if (registerUser) {
                    res.json({
                        statusCode: 200,
                        statusText: 'success',
                        message: 'User registered'
                    })
                    .status(200);
                }
            }

        } catch (error) {
            res.json({
                statusCode: 500,
                statusText: 'error',
                message: error.message
            })
            .status(500);
        }
    }
};

module.exports = userController;