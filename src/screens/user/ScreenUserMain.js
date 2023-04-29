import { Appbar, List } from "react-native-paper";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";

const ScreenUserMain = ({ navigation }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Pengaturan Pengguna" />
      </Appbar.Header>
      <WidgetBaseContainer>
        <List.Section>
          <List.Item
            title="Edit Account"
            left={() => <List.Icon icon="account-edit-outline" />}
          />
          <List.Item
            title="Logout"
            left={() => <List.Icon icon="logout-variant" />}
          />
        </List.Section>
      </WidgetBaseContainer>
    </>
  );
};

export default ScreenUserMain;
