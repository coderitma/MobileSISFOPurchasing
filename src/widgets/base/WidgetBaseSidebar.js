import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, SafeAreaView, StyleSheet, Text } from "react-native";
import { Divider, Drawer } from "react-native-paper";
import { useHookBaseIsAuthenticated } from "../../hooks/HookBase";

const WidgetBaseSidebar = (props) => {
  // const isAuthenticated = useHookBaseIsAuthenticated(props);

  const imageProfile =
    "https://icons.iconarchive.com/icons/iconka/lucky-leprechaun/256/leprechaun-outline-icon.png";
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Image source={{ uri: imageProfile }} style={styles.imageProfile} />
      <Text style={styles.title}>SISFO Purchasing</Text>
      <Divider />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default WidgetBaseSidebar;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop: 40,
  },
  imageProfile: {
    resizeMode: "center",
    width: 128,
    height: 128,
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
  },
});
