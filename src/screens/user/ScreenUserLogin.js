import { useContext, useState } from "react";
import { Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import SchemaUser from "../../schema/SchemaUser";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";
import WidgetBaseGroup from "../../widgets/base/WidgetBaseGroup";
import WidgetBaseCenter from "../../widgets/base/WidgetBaseCenter";
import WidgetBaseLogo from "../../widgets/base/WidgetBaseLogo";
import { ServiceBaseStoreToken } from "../../services/ServiceBase";
import { ServiceUserLogin } from "../../services/ServiceUser";
import { ContextUserAuthentication } from "../../contexts/ContextUser";

const ScreenUserLogin = ({ navigation }) => {
  const [, setIsAuthenticated] = useContext(ContextUserAuthentication);
  const [user, setUser] = useState(SchemaUser);

  const handleChange = (name, value) => {
    setUser((values) => ({ ...values, [name]: value }));
  };

  const handleLogin = () => {
    const payload = {
      email: user.email,
      password: user.password,
    };

    ServiceUserLogin(payload)
      .then(async (token) => {
        await ServiceBaseStoreToken(token);
        setIsAuthenticated(true);
        navigation.navigate("RouterBarang", { screen: "ScreenBarangList" });
        Alert.alert("Berhasil", "Anda berhasil login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <WidgetBaseContainer>
        <WidgetBaseCenter spaceHorizontal={8}>
          <WidgetBaseLogo />
          <WidgetBaseGroup>
            <TextInput
              value={user.email || ""}
              onChangeText={(text) => handleChange("email", text)}
              mode="outlined"
              label="Email"
            />
            <TextInput
              value={user.password || ""}
              onChangeText={(text) => handleChange("password", text)}
              secureTextEntry={true}
              mode="outlined"
              label="Password"
            />
          </WidgetBaseGroup>
          <WidgetBaseGroup>
            <Button onPress={handleLogin} mode="contained">
              Login
            </Button>
            <Button
              onPress={() => navigation.navigate("ScreenUserRegister")}
              mode="outlined">
              Register
            </Button>
          </WidgetBaseGroup>
        </WidgetBaseCenter>
      </WidgetBaseContainer>
    </>
  );
};

export default ScreenUserLogin;
