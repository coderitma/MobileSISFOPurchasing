import { Button, TextInput } from "react-native-paper";
import WidgetBaseCenter from "../../widgets/base/WidgetBaseCenter";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";
import WidgetBaseGroup from "../../widgets/base/WidgetBaseGroup";
import WidgetBaseLogo from "../../widgets/base/WidgetBaseLogo";
import { useState } from "react";
import SchemaUser from "../../schema/SchemaUser";
import { ServiceUserRegister } from "../../services/ServiceUser";

const ScreenUserRegister = ({ navigation }) => {
  const [user, setUser] = useState(SchemaUser);

  const handleChange = (name, value) => {
    setUser((values) => ({ ...values, [name]: value }));
  };

  const handleRegister = () => {
    ServiceUserRegister(user)
      .then((response) => {
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <WidgetBaseContainer>
      <WidgetBaseCenter spaceHorizontal={8}>
        <WidgetBaseLogo />
        <WidgetBaseGroup>
          <TextInput
            value={user.firstName}
            onChangeText={(text) => handleChange("firstName", text)}
            mode="outlined"
            label="First Name"
          />
          <TextInput
            value={user.lastName}
            onChangeText={(text) => handleChange("lastName", text)}
            mode="outlined"
            label="Last Name"
          />
          <TextInput
            value={user.email}
            onChangeText={(text) => handleChange("email", text)}
            mode="outlined"
            label="Email"
          />
          <TextInput
            value={user.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry={true}
            mode="outlined"
            label="Password"
          />
        </WidgetBaseGroup>
        <WidgetBaseGroup>
          <Button onPress={handleRegister} mode="contained">
            Register
          </Button>
          <Button onPress={() => navigation.goBack()} mode="outlined">
            Login
          </Button>
        </WidgetBaseGroup>
      </WidgetBaseCenter>
    </WidgetBaseContainer>
  );
};

export default ScreenUserRegister;
