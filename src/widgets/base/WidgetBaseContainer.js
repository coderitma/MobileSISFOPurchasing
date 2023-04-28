import { StatusBar } from "expo-status-bar";
import { memo } from "react";
import { ScrollView, StyleSheet } from "react-native";

const WidgetBaseContainer = ({ children, style }) => {
  return (
    <ScrollView contentContainerStyle={[styles.container, style]}>
      <StatusBar barStyle="default" />
      {children}
    </ScrollView>
  );
};

export default memo(WidgetBaseContainer);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: 16,
    gap: 16,
    paddingVertical: 16,
  },
});
