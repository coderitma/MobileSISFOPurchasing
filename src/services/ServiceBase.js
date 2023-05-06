import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

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

export const ServiceBaseActivity = (callback, timer = 1000) => {
  const timeout = setTimeout(() => {
    callback();
    clearTimeout(timeout);
  }, timer);
};

export const ServiceBaseIsDuplicateArray = (items, val, by) => {
  let flatItems = items.map((value) => value[by]);
  return flatItems.includes(val);
};

export const ServiceBaseHumanDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (typeof date === "string") {
    return new Date(Date.parse(date)).toLocaleString("id-ID", options);
  }
  if (date) {
    return date.toLocaleString("id-ID", options);
  }

  return "";
};

export const ServiceBaseHumanCurrency = (money, prefix = "Rp.") => {
  if (money && typeof money === "number") {
    return `${prefix} ${money
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
  }

  return "0";
};

export default function ServiceBaseRandomID(prefix = "ID") {
  const date = new Date();
  return `${prefix.toUpperCase()}-${date.getTime()}`;
}

export const ServiceBaseDateToISO = (date) => {
  return date.toISOString().substring(0, 10);
};

export const ServiceBaseFileSharing = (prefix, response) => {
  const fr = new FileReader();

  fr.onload = async () => {
    const fileUri = `${
      FileSystem.documentDirectory
    }${prefix}_${new Date().getTime()}.xlsx`;
    await FileSystem.writeAsStringAsync(fileUri, fr.result.split(",")[1], {
      encoding: FileSystem.EncodingType.Base64,
    });
    Sharing.shareAsync(fileUri);
  };
  fr.readAsDataURL(response.data);
};
