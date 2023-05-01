import { memo } from "react";
import { View } from "react-native";
import { ActivityIndicator, MD2Colors, Modal, Text } from "react-native-paper";

const WidgetBaseLoader = memo(({ complete }) => {
  if (!complete) {
    return (
      <Modal
        animationType="fade"
        // transparent={true}
        style={{ backgroundColor: "black" }}
        visible={!complete}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}>
          <ActivityIndicator
            size={40}
            animating={true}
            color={MD2Colors.blue200}
          />
          <Text style={{ color: "white" }} variant="labelLarge">
            Waiting moment...
          </Text>
        </View>
      </Modal>
    );
  } else {
    return null;
  }
});

export default WidgetBaseLoader;
