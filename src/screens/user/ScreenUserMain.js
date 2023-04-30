import { Appbar, List } from "react-native-paper";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";
import { ServiceBaseRemoveToken } from "../../services/ServiceBase";
import { useContext } from "react";
import { ContextUserAuthentication } from "../../contexts/ContextUser";

const ScreenUserMain = ({ navigation }) => {
  const [isAuthenticated, setIsAuthenticated] = useContext(
    ContextUserAuthentication
  );
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
            onPress={() => {
              ServiceBaseRemoveToken()
                .then(() => {
                  setIsAuthenticated(false);
                })
                .catch(() => {});
            }}
            left={() => <List.Icon icon="logout-variant" />}
          />
        </List.Section>
      </WidgetBaseContainer>
    </>
  );
};

export default ScreenUserMain;
