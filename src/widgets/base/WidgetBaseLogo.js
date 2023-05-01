import { StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";

const WidgetBaseLogo = () => {
  const url =
    "https://icons.iconarchive.com/icons/webalys/kameleon.pics/512/Conveyor-Belt-icon.png";
  return (
    <View style={styles.container}>
      <Image source={{ uri: url }} style={styles.image} />
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
    width: 190,
    height: 190,
    alignSelf: "center",
    marginBottom: 20,
  },
});
