import { CONFIG_BASE_API_URL } from "../config/ConfigBase";
import { ServiceBaseGetToken, ServiceBaseRequest } from "./ServiceBase";

export const ServicePembelianList = (page, terms) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await ServiceBaseGetToken(),
      },
      params: { page, terms },
    };

    ServiceBaseRequest.get(`${CONFIG_BASE_API_URL}/pembelian`, config)
      .then((response) => {
        const { results, ...pagination } = response.data;
        resolve({ results, pagination });
      })
      .catch((error) => reject(error));
  });
};

export const ServicePembelianCreate = (payload) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await ServiceBaseGetToken(),
      },
    };

    ServiceBaseRequest.post(`${CONFIG_BASE_API_URL}/pembelian`, payload, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const ServicePembelianDetail = (faktur) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await ServiceBaseGetToken(),
      },
    };

    ServiceBaseRequest.get(`${CONFIG_BASE_API_URL}/pemasok/${faktur}`, config)
      .then((response) => {
        const { items, ...pembelian } = response.data;
        resolve({ pembelian, items });
      })
      .catch((error) => reject(error));
  });
};
