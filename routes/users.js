const express = require('express')
const UserController = require('../controllers/UserController.js')
const router = express.Router()
const { authentication } = require('../middleware/authentication.js')
const {imageLoad} =require('../middleware/multer.js')

router.post('/',imageLoad,UserController.register)
router.post('/login', UserController.login)
router.delete('/logout', authentication, UserController.logout)
router.get('/', UserController.getUsers)
router.get('/id/:id', UserController.getUserById)
router.put('/id/:id', authentication, imageLoad, UserController.updateUser)
router.delete('/', authentication, UserController.deleteUser)
router.get('/confirm/:emailToken',UserController.confirm)

module.exports = router