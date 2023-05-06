import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenPembelianCreate from "../screens/pembelian/ScreenPembelianCreate";
import ScreenPembelianList from "../screens/pembelian/ScreenPembelianList";
import ScreenPembelianDetail from "../screens/pembelian/ScreenPembelianDetail";
import ScreenPembelianReporting from "../screens/pembelian/ScreenPembelianReporting";

const Stack = createNativeStackNavigator();

export const RouterPembelianAuthenticated = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ScreenPembelianList"
        component={ScreenPembelianList}
      />
      <Stack.Screen
        name="ScreenPembelianCreate"
        component={ScreenPembelianCreate}
      />
      <Stack.Screen
        name="ScreenPembelianDetail"
        component={ScreenPembelianDetail}
      />
      <Stack.Screen
        name="ScreenPembelianReporting"
        component={ScreenPembelianReporting}
      />
    </Stack.Navigator>
  );
};
