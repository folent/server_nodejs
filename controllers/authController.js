const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const {secret} = require('../config')

const generateAccessToken = (id, firstname, lastname, email, roles) => {
    const payload = {
        _id: id,
        firstname,
        lastname,
        email,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message: errors.errors[0].msg})
            }
            const {firstname, lastname, email, password} = req.body
            const candidate = await User.findOne({email})
            if(candidate) {
                return res.status(400).json({message: "Пользователь с таким Email уже существует"})
            }
            const salt = bcrypt.genSaltSync(6);
            const hashPassword = bcrypt.hashSync(password, salt)
            const userRole = await Role.findOne({name: "User"})
            const user = new User({firstname, lastname, email, password: hashPassword, roles: [userRole.name]})
            await user.save()
            return res.json({message: "Пользователь успешно зарегистрирован"})
        } catch (e) {
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user) {
                return res.status(400).json({message: `Пользователь с email ${email} не найден`})
            }

            const validPassword = bcrypt.compareSync(password, user.password)

            if(!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user._id, user.firstname, user.lastname, user.email, user.roles)
            return res.json({token, user})
        } catch (e) {
            res.status(400).json({message: 'Login error'})
        }
    }

    async checkAuth(req, res) {
        try {
            const token = req.headers.authorization;

            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    return res.status(403).json({message: "Пользователь неавторизован"})
                }
                else if(decoded) {
                    res.status(200).json({user: decoded, token});
                }
            })
        } catch (e) {

        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}


module.exports = new authController()