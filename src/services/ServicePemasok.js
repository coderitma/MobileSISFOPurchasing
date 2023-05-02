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

export const ServicePemasokCreate = (payload) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await ServiceBaseGetToken(),
      },
    };

    ServiceBaseRequest.post(`${CONFIG_BASE_API_URL}/pemasok`, payload, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const ServicePemasokEdit = (payload) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await ServiceBaseGetToken(),
      },
    };

    ServiceBaseRequest.put(
      `${CONFIG_BASE_API_URL}/pemasok/${payload.kodePemasok}`,
      payload,
      config
    )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const ServicePemasokDelete = (kodePemasok) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await ServiceBaseGetToken(),
      },
    };

    ServiceBaseRequest.delete(
      `${CONFIG_BASE_API_URL}/pemasok/${kodePemasok}`,
      config
    )
      .then(() => {
        resolve(null);
      })
      .catch((error) => reject(error));
  });
};
