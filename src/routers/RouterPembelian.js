import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenPembelianCreate from "../screens/pembelian/ScreenPembelianCreate";

const Stack = createNativeStackNavigator();

export const RouterPembelianAuthenticated = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ScreenPembelianCreate"
        component={ScreenPembelianCreate}
      />
    </Stack.Navigator>
  );
};
