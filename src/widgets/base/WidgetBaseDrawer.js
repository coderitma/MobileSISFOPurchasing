import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import WidgetBaseSidebar from "./WidgetBaseSidebar";
import RouterBarang from "../../routers/RouterBarang";
import RouterPemasok from "../../routers/RouterPemasok";
import RouterUser from "../../routers/RouterUser";
const Drawer = createDrawerNavigator();

const WidgetBaseDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => <WidgetBaseSidebar {...props} />}>
        <Drawer.Screen
          options={{
            drawerLabel: "Barang",
            title: "Barang",
          }}
          name="RouterBarang"
          component={RouterBarang}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Pemasok",
            title: "Pemasok",
          }}
          name="RouterPemasok"
          component={RouterPemasok}
        />
        <Drawer.Screen
          options={{
            // drawerItemStyle: { display: "none" },
            // swipeEnabled: false,
            drawerLabel: "User",
            title: "User",
          }}
          name="RouterUser"
          component={RouterUser}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default WidgetBaseDrawer;
