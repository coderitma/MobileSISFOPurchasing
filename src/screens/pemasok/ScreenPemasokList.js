import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ServicePemasokList } from "../../services/ServicePemasok";
import { Appbar, Divider, List } from "react-native-paper";
import { FlatList, View } from "react-native";
import WidgetBaseFABCreate from "../../widgets/base/WidgetBaseFABCreate";

export default function ScreenPemasokList({ navigation }) {
  const isFocus = useIsFocused();
  const [daftarPemasok, setDaftarPemasok] = useState();
  const [, setPagination] = useState();
  const [page] = useState(1);
  const [terms] = useState("");

  useEffect(() => {
    ServicePemasokList(page, terms)
      .then(({ results, pagination }) => {
        setDaftarPemasok(results);
        setPagination(pagination);
      })
      .catch((error) => {});
  }, [isFocus, page]);

  const renderItem = ({ item }) => (
    <>
      <List.Item title={item.namaPemasok} description={item.teleponPemasok} />
      <Divider />
    </>
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Pemasok" />
      </Appbar.Header>
      <View style={{ flex: 1 }}>
        <FlatList
          data={daftarPemasok}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
      <WidgetBaseFABCreate action={() => {}} />
    </>
  );
}
