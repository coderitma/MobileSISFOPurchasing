import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenUserLogin from "../screens/user/ScreenUserLogin";
import ScreenUserRegister from "../screens/user/ScreenUserRegister";
import ScreenUserLogout from "../screens/user/ScreenUserLogout";
import { useHookBaseIsAuthenticated } from "../hooks/HookBase";
import ScreenUserMain from "../screens/user/ScreenUserMain";

const Stack = createNativeStackNavigator();

const RouterUser = ({ navigation }) => {
  const isAuthenticated = useHookBaseIsAuthenticated({ navigation });

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated && (
        <>
          <Stack.Screen name="ScreenUserMain" component={ScreenUserMain} />
          <Stack.Screen
            options={{
              drawerLabel: "Logout",
              title: "Logout",
            }}
            name="ScreenUserLogout"
            component={ScreenUserLogout}
          />
        </>
      )}
      {!isAuthenticated && (
        <>
          <Stack.Screen name="ScreenUserLogin" component={ScreenUserLogin} />
          <Stack.Screen
            name="ScreenUserRegister"
            component={ScreenUserRegister}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RouterUser;
