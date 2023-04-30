import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenUserLogin from "../screens/user/ScreenUserLogin";
import ScreenUserRegister from "../screens/user/ScreenUserRegister";
import ScreenUserLogout from "../screens/user/ScreenUserLogout";
import ScreenUserMain from "../screens/user/ScreenUserMain";
import { useContext } from "react";
import { ContextUserAuthentication } from "../contexts/ContextUser";

const Stack = createNativeStackNavigator();

export const RouterUserAuthenticated = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScreenUserMain" component={ScreenUserMain} />
      <Stack.Screen
        options={{
          drawerLabel: "Logout",
          title: "Logout",
        }}
        name="ScreenUserLogout"
        component={ScreenUserLogout}
      />
    </Stack.Navigator>
  );
};

export const RouterUserNotAuthenticated = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScreenUserLogin" component={ScreenUserLogin} />
      <Stack.Screen name="ScreenUserRegister" component={ScreenUserRegister} />
    </Stack.Navigator>
  );
};

const RouterUser = ({ navigation }) => {
  const [isAuthenticated] = useContext(ContextUserAuthentication);

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
