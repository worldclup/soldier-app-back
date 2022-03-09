const express = require('express')
const router = express.Router()
const userUtil = require('../controller/user_controller')
var validateUtil = require('../controller/validate_controller')

/////////////////////////////////////////////////
//                                             //
//                  //user                     //
//                                             //
/////////////////////////////////////////////////

router.post('/user_register',
    validateUtil.validate_user_register(),
    userUtil.user_register(),
    function (req, res) {

        res.status(200).json({
            'success': true,
            token: req.token,
            message: "สมัครสมาชิกสำเร็จ"
        })
    })

router.post('/user_login',
    validateUtil.validate_user_login(),
    userUtil.user_login(),
    function (req, res) {

        res.status(200).json({
            'success': true,
            token: req.token,
            message: "เข้าสู่ระบบสำเร็จ"
        })
    }
)

router.get('/get_profile',
    validateUtil.validate_token_user(),
    userUtil.get_profile(),
    (req, res) => {
        res.status(200).json({
            'success': true,
            result: req.result
        })
    }
)

router.post('/upload_userpdf',
    userUtil.upload_userpdf(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            token: req.token,
            message: "อัปโหลด PDF เสร็จเรียบร้อย"
        })
    }
)

router.post('/upload_description_user',
    userUtil.upload_description_user(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            token: req.token,
            message: "อัปโหลด ข้อมูลเพิ่มเติม เสร็จเรียบร้อย"
        })
    }
)

/////////////////////////////////////////////////
//                                             //
//                  //admin                    //
//                                             //
/////////////////////////////////////////////////

router.get('/get_all_user',
    userUtil.get_all_user(),
    (req, res) => {
        res.status(200).json({
            'success': true,
            result: req.result
        })
    }
)

router.get('/get_user',
    userUtil.get_user(),
    (req, res) => {
        res.status(200).json({
            'success': true,
            result: req.result
        })
    }
)

router.post('/upload_userpdf_admin',
    userUtil.upload_userpdf_admin(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: "อัปโหลด PDF เสร็จเรียบร้อย"
        })
    }
)

router.post('/change_password_admin',
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: "เปลี่ยนรหัสผ่านเรียบร้อย"
        })
    }
)

router.get('/get_des_user_all',
    userUtil.get_des_user_all(),
    (req, res) => {
        res.status(200).json({
            'success': true,
            result: req.result
        })
    }
)

router.get('/get_des_user',
    userUtil.get_des_user(),
    (req, res) => {
        res.status(200).json({
            'success': true,
            result: req.result
        })
    }
)

router.post('/del_userdes_admin',
    userUtil.del_userdes_admin(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: "ลบ des เรียบร้อย"
        })
    }
)

module.exports = router