import { CONFIG_BASE_API_URL } from "../config/ConfigBase";
import { ServiceBaseRequest } from "./ServiceBase";

export const ServiceUserLogin = (payload) => {
  return new Promise((resolve, reject) => {
    ServiceBaseRequest.post(`${CONFIG_BASE_API_URL}/user/login`, payload)
      .then((response) => {
        resolve(response.data.token);
      })
      .catch((error) => reject(error));
  });
};

export const ServiceUserRegister = (payload) => {
  return new Promise((resolve, reject) => {
    ServiceBaseRequest.post(`${CONFIG_BASE_API_URL}/user/register`, payload)
      .then((response) => {
        console.log(response);
        resolve(response);
      })
      .catch((error) => reject(error));
  });
};
