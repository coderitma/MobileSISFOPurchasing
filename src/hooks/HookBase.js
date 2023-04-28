import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ServiceBaseGetToken,
  ServiceBaseRemoveToken,
} from "../services/ServiceBase";
import { Banner } from "react-native-paper";
import { Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import WidgetBaseLoader from "../widgets/base/WidgetBaseLoader";
import { View } from "react-native";

export function useHookBasePreventPermission({ navigation }) {
  const isFocus = useIsFocused();
  useEffect(() => {
    ServiceBaseGetToken()
      .then(async (token) => {
        if (token) {
          navigation.navigate("RouterBarang", { screen: "ScreenBarangList" });
        }
      })
      .catch(async (error) => {});
  }, [isFocus]);
}

export function useHookBaseApplyPermission({ navigation }) {
  const isFocus = useIsFocused();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      ServiceBaseGetToken()
        .then(async (token) => {
          if (token) setIsAuthenticated(true);
          else {
            setIsAuthenticated(false);
            await ServiceBaseRemoveToken();
          }
          setComplete(true);
        })
        .catch(async (error) => {});
    }, 1000);
  }, [isFocus]);

  const info = (child) => (
    <>
      <WidgetBaseLoader complete={complete} />
      {complete && isAuthenticated === false && (
        <View style={{ flex: 1, justifyContent: "center", margin: 16 }}>
          <Banner
            visible={isAuthenticated === false}
            actions={[
              {
                label: "Login",
                onPress: () =>
                  navigation.navigate("RouterUser", {
                    screen: "ScreenUserLogin",
                  }),
              },
            ]}
            icon={({ size }) => (
              <Image
                source={{
                  uri: "https://icons.iconarchive.com/icons/hopstarter/soft-scraps/128/Lock-Lock-icon.png",
                }}
                style={{
                  width: size,
                  height: size,
                }}
              />
            )}>
            Maaf, sesi login Anda telah habis. Silakan login kembali untuk
            melanjutkan.
          </Banner>
        </View>
      )}

      {complete && isAuthenticated === true && child}
    </>
  );

  return [info, isAuthenticated];
}

export function useHookBaseIsMounted() {
  const isMountedRef = useRef(true);
  const isMounted = useCallback(() => isMountedRef.current, []);

  useEffect(() => {
    return () => void (isMountedRef.current = false);
  }, []);

  return isMounted;
}
