const router = require('express').Router();
const multer = require('multer')
const Authcontroller = require('../controller/Authcontroller');
const { authenticateToken } = require('./jwt');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/assets')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 4 }
})

router.post('/register', upload.single('img'), Authcontroller.reg)
router.post('/login', Authcontroller.login)
router.get('/profile',authenticateToken, Authcontroller.profile)

module.exports = router