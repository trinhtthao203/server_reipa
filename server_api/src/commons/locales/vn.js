/* eslint-disable import/no-anonymous-default-export */
// =============================================================================
// Lang for Vietnamese
// =============================================================================

export default {
    App: {
        TITLE: "Reipa"
    },
    Common: {
        MOMENT_DATE_FORMAT: "DD/MM/YYYY",
        MOMENT_DATETIME_FORMAT: "DD/MM/YYYY HH:mm",
        MOMENT_DATETIME_FORMAT2: "DD/MM/YYYY HH:mm:ss",
        MOMENT_DATETIME_FORMAT3: "DD/MM/YYYY HH:mm:ss.SSS",
        MOMENT_TIME_FORMAT: "HH:mm",
        MOMENT_TIME_FORMAT2: "HH:mm:ss",
    },

    Message: {
        COMMON_ERROR: "Đã có lỗi xảy ra. Vui lòng thử lại",
        REQUEST_TIMEOUT: "Hết phiên nhập",
        REQUEST_401: "Unauthorized",
        REQUEST_403: "Forbidden",
        REQUEST_TIME_OUT: "Hết phiên đăng nhập vui lòng đăng nhập lại!",
        FEILD_REQUIRED_MESSAGE: "Vui lòng nhập các trường bắt buộc !",
        NOT_FOUND_MESSAGE: "Không tìm thấy dữ liệu",
        SUCCES_LOGIN_MESSAGE: "Đăng nhập thành công",
        PHONE_NUMBER_EXISTS_MESSAGE: "Số điện thoại tồn tại",
        PHONE_NUMBER_NOT_EXISTS_MESSAGE: "Số điện thoại không tồn tại"
    },

    User: {
        ID_INCORRECT_MESSAGE: "Id tài khoản không tồn tại",
        PASSWORD_INCORRECT_MESSAGE: "Mật khẩu không đúng",
        PHONE_NUMBER_INCORRECT_MESSAGE: "Số điện thoại không đúng",
        SUCCESS_LOGIN_MESSAGE: "Đăng nhập thành công"
    },

    Register: {
        SUCCESS_REGISTER_MESSAGE: "Đăng ký thành công !",
        PHONE_NUMBER_EXISTS_MESSAGE: "Số điện thoại đã tồn tại !",
    },

    Address: {
        REQUEST_PROVINCE_ID: "Vui lòng chọn mã tỉnh"
    },

    Provinces: {
        UPDATE_BORDER_PROVINCE_SUCCES: "Cập nhật ranh giới tỉnh thành công",
    },

    Wards: {
        UPDATE_BORDER_WARD_SUCCES: "Cập nhật ranh giới phường/xã thành công",
        REQUEST_PROVINCE_MESSAGE: "Không tìm thấy mã tỉnh/thành phố ",
        REQUEST_DISTRICT_MESSAGE: "Không tìm thấy mã quận/huyện",
        REQUEST_WARD_MESSAGE: "Không tìm thấy mã xã/phường",
        NOT_CORRECT_WARD_MESSAGE: "Không tìm thấy mã xã/phường",
        CORRECT_WARD_MESSAGE: "Tìm thấy mã xã/phường",
        REQUEST_COORDINATES_MESSAGE: "Không tìm thấy tọa độ ranh giới phường/xã",
    },


    Database: {
        ID: "id",
        PHONE_NUMBER: "phonenumber",
        PASSWORD: "password",
        FULL_NAME: "fullname",
        ADDRESS: "address",
        AVATAR: "avatar",
        STREET_ID: "street_id",
        WARD_ID: "ward_id",
        ROLE_ID: "role_id",
    }
}