import { Image } from "react-native";
import { Banner } from "react-native-paper";
import { ServiceBaseRemoveToken } from "../../services/ServiceBase";

export default function ScreenUserLogout({ navigation }) {
  return (
    <Banner
      visible={true}
      actions={[
        {
          label: "Tidak",
          onPress: () => navigation.goBack(),
        },
        {
          label: "Ya!",
          onPress: () => {
            ServiceBaseRemoveToken()
              .then(() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "RouterUser" }],
                });
              })
              .catch(() => {});
          },
        },
      ]}
      icon={({ size }) => (
        <Image
          source={{
            uri: "https://avatars3.githubusercontent.com/u/17571969?s=400&v=4",
          }}
          style={{
            width: size,
            height: size,
          }}
        />
      )}>
      There was a problem processing a transaction on your credit card.
    </Banner>
  );
}
