import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, SafeAreaView, StyleSheet, Text } from "react-native";
import { Divider, Drawer, MD2Colors, MD2DarkTheme } from "react-native-paper";

const WidgetBaseSidebar = (props) => {
  const imageProfile = require("../../../assets/adaptive-icon.png");
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Image source={imageProfile} style={styles.imageProfile} />
      <Text style={styles.title}>Mobile SISFO Purchasing</Text>
      <Divider />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Divider />
      <Text
        style={{
          fontSize: 10,
          textAlign: "center",
          color: "grey",
          paddingVertical: 16,
        }}>
        StuvidLabs © {new Date().getFullYear()}
      </Text>
    </SafeAreaView>
  );
};

export default WidgetBaseSidebar;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop: 0,
  },
  imageProfile: {
    resizeMode: "center",
    width: "100%",
    height: "30%",
    alignSelf: "center",
    // borderRadius: 100,
    padding: 10,
    backgroundColor: MD2Colors.purple900,
  },
  title: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
  },
});
