import { StyleSheet } from "react-native";
import { Image } from "react-native";

const WidgetBaseLogo = () => {
  const url =
    "https://icons.iconarchive.com/icons/iconka/business-outline/512/cash-register-icon.png";
  return <Image source={{ uri: url }} style={styles.image} />;
};

export default WidgetBaseLogo;

const styles = StyleSheet.create({
  image: {
    resizeMode: "center",
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
  },
});
