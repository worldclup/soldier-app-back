let errorMessage = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')
let jsonwebToken = require('jsonwebtoken')
let bcrypt = require('bcryptjs');
let encrytp = require('../const/encrypt');
const { stringify } = require('querystring');

var moment = require('moment')

/////////////////////////////////////////////////
//                                             //
//                  //user                     //
//                                             //
/////////////////////////////////////////////////

exports.user_register = function () {
    return function (req, res, next) {
        if (req.body.username.length == 10 && req.body.password == req.body.passwordconfirm) {
            db.query(`SELECT username FROM user_info WHERE username = '${req.body.username}'`, (err, resultUser) => {
                if (err) throw err;
                if (typeof resultUser[0] === 'undefined') {

                    let registerInfo = {
                        username: req.body.username,
                        password: encrytp.encrytp(req.body.password),
                        type_user: 1,
                    }

                    db.query(`INSERT INTO user_info SET ?`, registerInfo, (err, result) => {
                        if (err) throw err;

                        req.token = jsonwebToken.sign(
                            {
                                id: result.insertId,
                                type: registerInfo.type_user
                            }, constance.sign)

                        next()
                    })
                }
                else {
                    res.status(200).json(errorMessage.err_user_already)
                    return;
                }
            })
        }
        else if (req.body.username.length != 10) {
            res.status(200).json(errorMessage.err_user_not_length)
            return;
        }
        else {
            res.status(200).json(errorMessage.err_pass_not_match)
            return;
        }

    }
}

exports.user_login = () => {
    return (req, res, next) => {

        db.query(`SELECT * FROM user_info WHERE username = ?`, req.body.username, (err, result) => {
            if (err) throw err;
            if (result[0]) {

                let password = result[0].password

                if (bcrypt.compareSync(req.body.password, password)) {

                    req.token = jsonwebToken.sign(
                        {
                            id: result[0].user_id,
                            type: result[0].type_user,
                        }, constance.sign)

                    db.query(`UPDATE user_info SET noti_token = '${JSON.stringify(req.token)}' WHERE user_id = '${result[0].user_id}'`, (err, resultUpdateUser) => {
                        if (err) throw err;
                        next()
                    })
                }
                else {
                    res.status(200).json(errorMessage.user_worng_password)
                }
            }
            else {
                res.status(200).json(errorMessage.user_not_found)
            }
        })
    }
}

exports.get_profile = () => {
    return (req, res, next) => {
        db.query(`SELECT * FROM user_info WHERE user_id = ?`, req.user_id, (err, result) => {
            if (err) throw err;
            else {

                let data = {
                    user_id: result[0].user_id,
                    username: result[0].username,
                    pdf_text: JSON.parse(result[0].pdf_text)
                }

                req.result = data
                next()

            }
        })
    }
}

exports.upload_userpdf = () => {
    return (req, res, next) => {

        let obj = {
            user_id: req.body.user_id,
            pdf_text: JSON.stringify(req.body.pdf_data)
        }

        db.query(`UPDATE user_info SET pdf_text = ? WHERE user_id = ?`, [obj.pdf_text, obj.user_id], (err) => {
            if (err) throw err
            else {
                next()
            }
        })
    }
}

exports.upload_description_user = () => {
    return (req, res, next) => {

        let obj = {
            user_id: req.body.user_id,
            username: req.body.username,
            time: moment().format('DD-MM-YYYY HH:mm:ss'),
            description: req.body.description
        }

        db.query(`SELECT * FROM user_des WHERE username = ?`, obj.username, (err, result) => {
            if (err) throw err;
            else {

                if (result == '') {
                    db.query(`INSERT INTO user_des SET ?`, obj, (err) => {
                        if (err) throw err;
                        else {
                            next()
                        }
                    })
                }
                else {
                    db.query(`UPDATE user_des SET description = ? WHERE username = ?`, [obj.description, obj.username], (err) => {
                        if (err) throw err
                        else {
                            next()
                        }
                    })
                }

            }
        })
    }
}

/////////////////////////////////////////////////
//                                             //
//                  //admin                    //
//                                             //
/////////////////////////////////////////////////

exports.get_all_user = () => {
    return (req, res, next) => {
        db.query(`SELECT * FROM user_info WHERE type_user = 1`, (err, result) => {
            if (err) throw err
            else {
                let obj = []
                result.map((element) => {
                    obj.push({
                        username: element.username,
                        pdf_text: element.pdf_text,
                    })
                })
                req.result = obj
                next()
            }
        })
    }
}

exports.get_user = () => {
    return (req, res, next) => {

        db.query(`SELECT * FROM user_info WHERE username = ?`, req.body.username, (err, result) => {
            if (err) throw err
            else {
                req.result = result
                next()
            }
        })
    }
}

exports.upload_userpdf_admin = () => {
    return (req, res, next) => {

        let obj = {
            username: req.body.username,
            pdf_text: req.body.pdf_data
        }

        db.query(`UPDATE user_info SET pdf_text=? WHERE username=?`, [obj.pdf_text, obj.username], (err) => {
            if (err) throw err
            else {
                next()
            }
        })
    }
}

exports.change_password_admin = () => {
    return (req, res, next) => {
        let obj = {
            username: req.body.username,
            password: req.body.password
        }

        db.query(`UPDATE user_info SET password = ? WHERE username = ?`, [obj.password, obj.username], (err) => {
            if (err) throw err
            else {
                next()
            }
        })
    }
}

exports.get_des_user_all = () => {
    return (req, res, next) => {
        db.query(`SELECT * FROM user_des`, (err, result) => {
            if (err) throw err
            else {
                req.result = result
                next()
            }
        })
    }
}

exports.get_des_user = () => {
    return (req, res, next) => {
        db.query(`SELECT * FROM user_des WHERE username = ?`, req.body.username, (err, result) => {
            if (err) throw err
            else {
                req.result = result
                next()
            }
        })
    }
}

exports.del_userdes_admin = () => {
    return (req, res, next) => {
        console.log(req.body.username)
        db.query('DELETE FROM user_des WHERE user_des.username=?', req.body.username, (err) => {
            if (err) throw err
            else {
                next()
            }
        })
    }
}