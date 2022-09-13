const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const buildings = require('./buildings/buildings')
const complexes = require('./complexes/complexes')
const houses = require('./houses/houses')
const banks = require('./banks/banks')
const result = require('./result/result')
const admin = require('./adminController/admin')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/image/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

router
    .get('/', buildings.GET)
    .get('/admin', admin.GET)
    .get('/buildings/:id', buildings.GET_BY_ID)
    .get('/complexes/:id', complexes.GET)
    .get('/complex/:id', complexes.GET_BY_ID)
    .get('/houses/:id', houses.GET)
    .get('/house/:id', houses.GET_BY_ID)
    .get('/period', banks.PERIOD_GET)
    .get('/allbuildings', admin.ALL_BUILDINGS)
    .get('/allcomplexes', admin.ALL_COMPLEXES)
    .get('/allbanks', admin.GET_ALL_BANKS)
    .get('/buildingnames', admin.BUILDING_NAMES)
    .get('/allhouses', admin.ALL_HOUSE)
    .get('/complexnames', admin.COMPEX_NAMES)
    .post('/bank', banks.GET)
    .post('/result', result.POST)
    .post('/addbuilding', upload.single('image'), admin.ADD_BUILDING)
    .post('/addcomplex', upload.single('image'), admin.ADD_COMPLEX)
    .post('/addhouse', upload.single('image'), admin.ADD_HOUSE)
    .post('/add-bank', upload.single('image'), admin.ADD_BANK)


module.exports = router