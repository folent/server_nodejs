const Router = require('express')
const router = new Router()
const authController = require('./controllers/authController')
const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post('/registration', [
    check('firstname', "Имя пользователя не должно быть пустым").notEmpty(),
    check('lastname', "Фамилия пользователя не должно быть пустым").notEmpty(),
    check('password', "Пароль должен быть от 6 до 10 символов").isLength({min: 6, max: 10}),
    check('email', "Некорректный Email").isEmail()
], authController.registration)
router.post('/login', authController.login)
router.get('/users', roleMiddleware(["User"]), authController.getUsers)

module.exports = router