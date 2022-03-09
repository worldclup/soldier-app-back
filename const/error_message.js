var errorMessage = {
  // Database 10+000
  'err_database': { 'success': false, 'error_code': '10001', 'error_message': 'There Was a Problem in Database.' },

  // Validation 20+000
  'err_required_token': { 'success': false, 'error_code': '20001', 'error_message': 'authorization is Required in Header.' },
  'err_required_fingerprint_token': { 'success': false, 'error_code': '20001', 'error_message': 'Fingerprint token not found.' },
  'err_basic_auth': { 'success': false, 'error_code': '20002', 'error_message': 'Basic Authentication Failed.' },
  'err_wrong_password': { 'success': false, 'error_code': '20003', 'error_message': 'ลงชื่อเข้าใช้ผิดพลาด ชื่อผู้ใช้งาน หรือรหัสผ่านไม่ถูกต้อง' },
  'err_check_password': { 'success': false, 'error_code': '20004', 'error_message': 'รหัสผ่านเดิมไม่ถูกต้อง' },

  'err_no_permission': { 'success': false, 'error_code': '20005', 'error_message': 'Authentication Failed. No Permission to Access' },
  'err_invalid_citizenId': { 'success': false, 'error_code': '20006', 'error_message': 'Citizen ID is invalid' },
  'err_wrong_login': { 'success': false, 'error_code': '20012', 'error_message': 'Wrong login. Please reset password.' },

  // Token 30+000
  'err_token_expire': { 'success': false, 'error_code': '30001', 'error_message': 'Authentication Failed. Token Expire.' },
  'err_token_fingerprint_expire': { 'success': false, 'error_code': '30002', 'error_message': 'Authentication Failed. Token Fingerprint Expire.' },

  // Not found 40+000

  'user_not_found': { 'success': false, 'error_code': '40001', 'error_message': 'ลงชื่อเข้าใช้ผิดพลาด ชื่อผู้ใช้งานไม่ถูกต้อง' },
  'user_worng_password': { 'success': false, 'error_code': '40002', 'error_message': 'ชื่อผู้ใช้งาน หรือรหัสผ่านไม่ถูกต้อง' },

  // Already 50+000

  'err_user_already': { 'success': false, 'error_code': '50001', 'error_message': 'ผู้ใช้นี้ เคยสมัครแล้ว' },
  'err_user_not_length': { 'success': false, 'error_code': '50002', 'error_message': 'ใส่เลขผู้ใช้งานให้ครบ 10 หลัก' },
  'err_pass_not_match': { 'success': false, 'error_code': '50003', 'error_message': 'รหัสผ่านไม่ตรงกัน' },
  'err_user_invalid': { 'success': false, 'error_code': '50004', 'error_message': 'User Invalid' },

  // 'err_insurance_already': { 'success': false, 'error_code': '50008', 'error_message': 'Insurance is already had.' },

  'err_incorrect_delete': { 'success': false, 'error_code': '50008', 'error_message': 'เกิดข้อผิดพลาดไม่สามารถลบได้' },


  // Can not create 70+000


  'invalid_data': { 'success': false, 'error_code': '20001', 'error_message': 'Error, กรุณากรอกข้อมูลให้ครบถ้วน' },


  'permission': { 'success': false, 'error_code': '60000', 'error_message': 'Error, permission deneied' }


}

module.exports = errorMessage
