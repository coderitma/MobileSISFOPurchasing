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

const Drawer = createDrawerNavigator();

const WidgetBaseDrawer = () => {
  const [isAuthenticated, setIsAuthenticated] =
    useHookUserAuthenticationInterface();
  const [dataContoh] = useState("lorem ipsum");

  return (
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
  );
};

export default WidgetBaseDrawer;
