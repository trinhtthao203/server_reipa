import Constants from "../constants"
import BaseService from "./base.service"
import axios from "../axios"

class UserService extends BaseService {

    handleLogIn = async (phonenumber, password) => {
        return axios.post(Constants.ApiPath.LOGIN,
            {
                phonenumber: phonenumber,
                password: password
            }
        )
    }
}

export default UserService;