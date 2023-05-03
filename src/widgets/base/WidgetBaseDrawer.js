import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import WidgetBaseSidebar from "./WidgetBaseSidebar";
import { RouterBarangAuthenticated } from "../../routers/RouterBarang";
import { RouterPemasokAuthenticated } from "../../routers/RouterPemasok";
import {
  RouterUserAuthenticated,
  RouterUserNotAuthenticated,
} from "../../routers/RouterUser";
import { useState } from "react";
import { ContextUserAuthentication } from "../../contexts/ContextUser";
import { useHookUserAuthenticationInterface } from "../../hooks/HookUser";
import { RouterPembelianAuthenticated } from "../../routers/RouterPembelian";
import { useHookBaseRefresh } from "../../hooks/HookBase";
import { ContextBaseRefresh } from "../../contexts/ContextBase";

const Drawer = createDrawerNavigator();

const WidgetBaseDrawer = () => {
  const [isAuthenticated, setIsAuthenticated] =
    useHookUserAuthenticationInterface();

  const { isRefresh, startRefresh, stopRefresh } = useHookBaseRefresh();
  const [dataContoh] = useState("lorem ipsum");

  return (
    <ContextBaseRefresh.Provider
      value={{ isRefresh, startRefresh, stopRefresh }}>
      <ContextUserAuthentication.Provider
        value={[isAuthenticated, setIsAuthenticated, dataContoh]}>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            drawerContent={(props) => <WidgetBaseSidebar {...props} />}>
            {isAuthenticated && (
              <>
                <Drawer.Screen
                  options={{
                    drawerLabel: "Barang",
                    title: "Barang",
                  }}
                  name="RouterBarang"
                  component={RouterBarangAuthenticated}
                />
                <Drawer.Screen
                  options={{
                    drawerLabel: "Pemasok",
                    title: "Pemasok",
                  }}
                  name="RouterPemasok"
                  component={RouterPemasokAuthenticated}
                />

                <Drawer.Screen
                  options={{
                    drawerLabel: "Pembelian",
                    title: "Pembelian",
                  }}
                  name="RouterPembelian"
                  component={RouterPembelianAuthenticated}
                />

                <Drawer.Screen
                  options={{
                    drawerLabel: "Pengaturan",
                    title: "Pengaturan",
                  }}
                  name="RouterUserAuthenticated"
                  component={RouterUserAuthenticated}
                />
              </>
            )}

            {!isAuthenticated && (
              <>
                <Drawer.Screen
                  options={{
                    drawerLabel: "Login",
                    title: "User",
                  }}
                  name="RouterUser"
                  component={RouterUserNotAuthenticated}
                />
              </>
            )}
          </Drawer.Navigator>
        </NavigationContainer>
      </ContextUserAuthentication.Provider>
    </ContextBaseRefresh.Provider>
  );
};

export default WidgetBaseDrawer;
