import { StyleSheet } from "react-native";
import { Image } from "react-native";

const WidgetBaseLogo = () => {
  const url =
    "https://icons.iconarchive.com/icons/kevin-thompson/love-and-breakup/512/shopping-bag-heart-icon.png";
  return <Image source={{ uri: url }} style={styles.image} />;
};

export default WidgetBaseLogo;

const styles = StyleSheet.create({
  image: {
    resizeMode: "center",
    width: 150,
    height: 150,
    alignSelf: "center",
  },
});
