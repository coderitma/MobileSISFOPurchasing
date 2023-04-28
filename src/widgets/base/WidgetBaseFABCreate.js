import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

function WidgetBaseFABCreate({ action, disabled }) {
  return (
    <FAB
      disabled={disabled}
      style={styles.fab}
      icon="plus"
      onPress={() => action()}
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 10,
    right: 0,
    bottom: 0,
  },
});

export default WidgetBaseFABCreate;
