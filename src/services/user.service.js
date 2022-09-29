import Constants from "../constants";
import * as apiProcessor from "./apiProcessor";

class UserService {
    handleLogIn = async (phonenumber, password) => {
        try {
            const result = apiProcessor.post(Constants.ApiPath.LOGIN, {
                phonenumber: phonenumber,
                password: password
            })
            return result;
        } catch (err) {
            console.log(err);
        }

    }
}

export default UserService;