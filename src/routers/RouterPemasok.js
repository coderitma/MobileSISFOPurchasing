import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenPemasokList from "../screens/pemasok/ScreenPemasokList";
import ScreenPemasokCreate from "../screens/pemasok/ScreenPemasokCreate";
import ScreenPemasokEdit from "../screens/pemasok/ScreenPemasokEdit";

const Stack = createNativeStackNavigator();

export default function RouterPemasok() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScreenPemasokList" component={ScreenPemasokList} />
      <Stack.Screen
        name="ScreenPemasokCreate"
        component={ScreenPemasokCreate}
      />
      <Stack.Screen name="ScreenPemasokEdit" component={ScreenPemasokEdit} />
    </Stack.Navigator>
  );
}
