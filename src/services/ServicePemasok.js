import { CONFIG_BASE_API_URL } from "../config/ConfigBase";
import { ServiceBaseGetToken, ServiceBaseRequest } from "./ServiceBase";

export function ServicePemasokList(page, terms) {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await ServiceBaseGetToken(),
      },
      params: { page, terms },
    };
    ServiceBaseRequest.get(`${CONFIG_BASE_API_URL}/pemasok`, config)
      .then((response) => {
        const { results, ...pagination } = response.data;
        resolve({ results, pagination });
      })
      .catch((error) => reject(error));
  });
}
