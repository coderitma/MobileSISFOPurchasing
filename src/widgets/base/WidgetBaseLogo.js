import { StyleSheet, View, Image, Platform } from "react-native";
import { MD2Colors, Text } from "react-native-paper";

const WidgetBaseLogo = () => {
  const url = require("../../../assets/adaptive-icon.png");
  return (
    <View style={styles.container}>
      <Image source={url} style={styles.image} />
      <Text variant="titleMedium">Mobile SISFO Purchasing</Text>
      <Text variant="bodySmall">by StuvidLabs {new Date().getFullYear()}</Text>
    </View>
  );
};

export default WidgetBaseLogo;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    resizeMode: "center",
    width: 160,
    height: 160,
    alignSelf: "center",
    marginBottom: 30,
    borderRadius: 48,
    backgroundColor: MD2Colors.deepPurple600,
  },
});
