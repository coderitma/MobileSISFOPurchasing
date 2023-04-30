import { useContext, useEffect, useState } from "react";
import { ContextUserAuthentication } from "../contexts/ContextUser";
import { useIsFocused } from "@react-navigation/native";
import { ServiceBaseGetToken } from "../services/ServiceBase";

export const useHookUserAuthenticationInterface = () => {
  const [isAuthenticated, setIsAuthenticated] = useState();

  useEffect(() => {
    console.log("call check token");
    setTimeout(async () => {
      const token = await ServiceBaseGetToken();
      setIsAuthenticated(token ? true : false);
    }, 1000);
  }, []);

  return [isAuthenticated, setIsAuthenticated];
};

export const useHookUserAuthenticationRedirect = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [isAuthenticated, , dataContoh] = useContext(ContextUserAuthentication);

  useEffect(() => {
    if (isFocused) {
      console.log("barang list", isAuthenticated, isFocused);
      if (!isAuthenticated) {
        navigation.navigate("RouterUser", { screen: "ScreenUserLogin" });
      }
    }
  }, [isFocused]);
};

export const useHookUserAuthenticationRedirectPrevent = ({ navigation }) => {
  const [isAuthenticated, b, c] = useContext(ContextUserAuthentication);

  useEffect(() => {
    console.log("kepanggil", isAuthenticated);
    if (isAuthenticated) {
      navigation.navigate("RouterBarang", { screen: "ScreenBarangList" });
    }
  }, [isAuthenticated]);
};
