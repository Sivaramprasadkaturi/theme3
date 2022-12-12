import axios from "axios";

import { REGISTER_FAILURE } from "../types.js";

import { REGISTER_LINK } from "../links.js";

import { VID } from "../../project-config";
import { fetchLogin } from "./loginActions.js";

function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
}

export const registerAccount = (data, callback) => async dispatch => {
  let form = {
    "customerDTO.firstName": data.firstname,
    "customerDTO.lastName": data.lastname,
    "customerDTO.loginname": data.email,
    confirmLogin: data.confirmEmail,
    "customerDTO.customerAddresses[1].phone": data.phone,
    "customerDTO.loginpassword": data.password,
    confirmPassword: data.confirmPassword,
    vendorId: VID,
    "customerDTO.vendorid": VID,
    "data.mid": "demo",
    mode: "register",
    anchorName: "",
    doSubmit: "register",
    register: `myaccount.html?mode=billingaddress&vid=${VID}`
  };

  console.log(`register: ${JSON.stringify(data)}`);

  const response = await axios
    .post(REGISTER_LINK, getFormData(form))
    .then(response => {
      console.log(`register response: ${JSON.stringify(response)}`);
      if (response.data.error) {
        return dispatch({
          type: REGISTER_FAILURE,
          payload: response.data.errorMessages
        });
      }
      console.log("success!", response);
      dispatch(fetchLogin());
      callback();
    })
    .catch(function (error) {
      dispatch({ type: REGISTER_FAILURE, payload: "Register Failure" });
      console.log(error);
    });
};
