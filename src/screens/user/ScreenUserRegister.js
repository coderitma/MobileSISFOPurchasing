import { Button, TextInput } from "react-native-paper";
import WidgetBaseLogo from "../../widgets/base/WidgetBaseLogo";
import { useEffect, useState } from "react";
import SchemaUser from "../../schema/SchemaUser";
import { ServiceUserRegister } from "../../services/ServiceUser";
import _ from "lodash";
import { SafeAreaView, ScrollView, View } from "react-native";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";

const ScreenUserRegister = ({ navigation }) => {
  const [user, setUser] = useState(SchemaUser);
  const [complete, setComplete] = useState(false);

  const handleChange = (name, value) => {
    setUser((values) => ({ ...values, [name]: value }));
  };

  const userRegister = () => {
    const debounce = _.debounce(() => {
      ServiceUserRegister(user)
        .then((response) => {
          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);

    debounce();
  };

  const backUserLogin = () => {
    const debounce = _.debounce(() => navigation.goBack(), 100);
    debounce();
  };

  useEffect(() => {
    setComplete(false);
    const debounce = _.debounce(() => {
      setComplete(true);
    }, 1000);

    debounce();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {complete && (
        <ScrollView
          contentContainerStyle={{
            gap: 16,
            marginHorizontal: 40,
            justifyContent: "center",
            flexGrow: 1,
            height: "100%",
          }}>
          <WidgetBaseLogo />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 16,
            }}>
            <TextInput
              style={{ flex: 1 }}
              value={user.firstName}
              onChangeText={(text) => handleChange("firstName", text)}
              label="First Name"
            />
            <TextInput
              style={{ flex: 1 }}
              value={user.lastName}
              onChangeText={(text) => handleChange("lastName", text)}
              label="Last Name"
            />
          </View>
          <TextInput
            value={user.email}
            onChangeText={(text) => handleChange("email", text)}
            label="Email"
          />
          <TextInput
            value={user.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry={true}
            label="Password"
          />

          <Button onPress={userRegister} mode="contained">
            Register
          </Button>
          <Button onPress={backUserLogin} mode="outlined">
            Login
          </Button>
        </ScrollView>
      )}

      <WidgetBaseLoader complete={complete} />
    </SafeAreaView>
  );
};

export default ScreenUserRegister;
