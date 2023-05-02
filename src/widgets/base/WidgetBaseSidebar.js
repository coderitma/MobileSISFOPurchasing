import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, SafeAreaView, StyleSheet, Text } from "react-native";
import { Divider, Drawer } from "react-native-paper";

const WidgetBaseSidebar = (props) => {
  const imageProfile =
    "https://icons.iconarchive.com/icons/webalys/kameleon.pics/512/Man-6-icon.png";
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Image source={{ uri: imageProfile }} style={styles.imageProfile} />
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
    marginVertical: 20,
    fontSize: 16,
  },
});
