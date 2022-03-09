var errorMessages = require('../const/error_message')
var jsonwebToken = require('jsonwebtoken')
var constance = require('../const/constance')

exports.validate_user_register = () => {
  return (req, res, next) => {
    if (
      req.body.username &&
      req.body.password &&
      req.body.passwordconfirm
    ) {
      next();
    }
    else {
      res.status(200).json(errorMessages.invalid_data)
    }
  }
}

exports.validate_user_login = function () {
  return function (req, res, next) {
    if (req.body.username && req.body.password) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data)
    }
  }
}

exports.validate_token_user = function () {
  return function (req, res, next) {
    // console.log(req.session.token)
    if (!Boolean(req.headers["authorization"])) {
      res.status(200).json({
        success: false,
        message: errorMessages.err_required_token
      });
    } else {
      // console.log("token")
      jsonwebToken.verify(
        req.headers.authorization,
        constance.sign,
        (err, decode) => {
          if (err) {
            // console.log(decode.type)
            res.status(200).json(errorMessages.err_required_fingerprint_token);
          } else {
            req.user_id = decode.id;
            next();

          }
        }
      );
    }
  };
};