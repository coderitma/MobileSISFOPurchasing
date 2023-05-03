import { StatusBar } from "expo-status-bar";
import { memo } from "react";
import { ScrollView, StyleSheet } from "react-native";

const WidgetBaseContainer = memo(({ children, style }) => {
  return (
    <ScrollView contentContainerStyle={[styles.container, style]}>
      <StatusBar barStyle="default" />
      {children}
    </ScrollView>
  );
});

export default WidgetBaseContainer;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: 0,
    gap: 8,
    paddingVertical: 0,
  },
});
