import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ServiceBaseGetToken } from "../services/ServiceBase";

import { useIsFocused } from "@react-navigation/native";

export function useHookBasePreventPermission({ navigation }) {
  const isFocus = useIsFocused();
  useEffect(() => {
    ServiceBaseGetToken()
      .then((token) => {
        if (token) {
          navigation.navigate("RouterBarang", { screen: "ScreenBarangList" });
        }
      })
      .catch(() => {});
  }, [isFocus]);
}

export function useHookBaseApplyPermission({ navigation }) {
  const isFocus = useIsFocused();

  const applyPermission = useMemo(() => {
    ServiceBaseGetToken()
      .then((token) => {
        if (!token) {
          navigation.reset({
            index: 0,
            routes: [{ name: "RouterUser" }],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isFocus]);

  return applyPermission;
}

export function useHookBaseIsAuthenticated({ navigation }) {
  const isFocus = useIsFocused();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    ServiceBaseGetToken()
      .then((token) => {
        if (token) {
          setIsAuthenticated(true);
        }
      })
      .catch(() => {});
  }, [isFocus]);

  return isAuthenticated;
}

export function useHookBaseIsMounted() {
  const isMountedRef = useRef(true);
  const isMounted = useCallback(() => isMountedRef.current, []);

  useEffect(() => {
    return () => void (isMountedRef.current = false);
  }, []);

  return isMounted;
}
