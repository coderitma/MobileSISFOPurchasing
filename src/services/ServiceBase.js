import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

export const ServiceBaseRequest = axios.create({
  timeout: 1000,
});

ServiceBaseRequest.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ServiceBaseRequest.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    // console.log(error.response.status);
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.errors
    ) {
      let messages = error.response.data.errors
        .map((item) => {
          return `${item.path}: ${item.msg}`;
        })
        .join(`\n`);

      Alert.alert("Ups!", messages);
    }
    return Promise.reject(error);
  }
);

export const ServiceBaseStoreToken = async (token) => {
  await AsyncStorage.setItem("token", token);
};

export const ServiceBaseGetToken = async () => {
  return await AsyncStorage.getItem("token");
};

export const ServiceBaseRemoveToken = async () => {
  await AsyncStorage.removeItem("token");
};
