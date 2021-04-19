const router = require('express').Router()

const countryController = require("../controllers/countryController")
const { JWTmiddleware, roles } = require('../middleware')

// we are in /api/countries

//GET ALL COUNTRIES
router.get('/', countryController.getAll)
//CREATE ONE
router.post('/', [JWTmiddleware, roles.isAdmin], countryController.createOne)
//UPDATE BY ID
router.put('/:id', [JWTmiddleware, roles.isAdmin], countryController.modifyOne)
//DELETE BY ID
router.delete('/:id', [JWTmiddleware], countryController.deleteOne)
//FALTA EL IS ADMIN
module.exports = router