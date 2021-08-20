const Router = require('express')
const router = new Router()
const authController = require('./controllers/authController')
const catalogController = require('./controllers/catalogController')
const orderController = require('./controllers/orderController')
const opinionController = require('./controllers/opinionController')
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
router.post('/auth', authController.checkAuth)
router.get('/users', roleMiddleware(["User"]), authController.getUsers)

router.get('/brands', catalogController.getBrands)
router.get('/categories', catalogController.getCategories)
router.get('/catalogitems/page/:currentPage/count/:pageSize', catalogController.getCatalogItems)
router.get('/catalogitemsbycategory/:id', catalogController.getCatalogItemsByCategory)
router.get('/catalogitem/:id', catalogController.getCatalogItemByID)
router.get('/catalogitems/page/:currentPage/count/:pageSize/sortby/:sort', catalogController.getSortCatalogItems)
router.get('/catalogitemscount/', catalogController.getCatalogItemsCount)

router.post('/orders', orderController.getOrders)
router.post('/order/', orderController.addOrder)

router.get('/opinions/:itemId', opinionController.getOpinions)
router.post('/opinions/', opinionController.addOpinion)
module.exports = router