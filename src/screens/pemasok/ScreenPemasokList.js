import _ from "lodash";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Appbar, DataTable, Searchbar } from "react-native-paper";
import { ServicePemasokList } from "../../services/ServicePemasok";
import WidgetBaseFABCreate from "../../widgets/base/WidgetBaseFABCreate";
import { ScrollView } from "react-native-gesture-handler";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";

const ScreenPemasokList = ({ navigation }) => {
  const [query, setQuery] = useState();
  const [complete, setComplete] = useState(false);
  const [daftarPemasok, setDaftarPemasok] = useState([]);
  const [pagination, setPagination] = useState({});

  const pemasokList = _.debounce((page, terms) => {
    setComplete(false);
    ServicePemasokList(page ? page : 1, terms ? terms : "")
      .then(({ results, pagination }) => {
        setPagination(pagination);
        setDaftarPemasok(results);
      })
      .catch((error) => console.log(error))
      .finally(() => setComplete(true));
  }, 100);

  const paginate = (page) => {
    pemasokList(page, query);
  };

  const search = (e) => {
    pemasokList(1, e.nativeEvent.text);
  };

  const refresh = () => {
    setQuery("");
    pemasokList(1, "");
  };

  const openPemasokEdit = _.debounce((pemasok) => {
    navigation.navigate("ScreenPemasokEdit", { pemasok });
  }, 100);

  const openPemasokCreate = _.debounce(() => {
    navigation.navigate("ScreenPemasokCreate");
  }, 100);

  useEffect(() => {
    pemasokList();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={navigation.toggleDrawer} />
        <Appbar.Content title="Pemasok" />
        <Appbar.Action icon="refresh" onPress={refresh} />
        <Appbar.Action
          icon="arrow-left"
          disabled={_.isNull(pagination?.prev)}
          onPress={() => paginate(pagination?.prev)}
        />
        <Appbar.Action
          icon="arrow-right"
          disabled={_.isNull(pagination?.next)}
          onPress={() => paginate(pagination?.next)}
        />
      </Appbar.Header>

      <ScrollView style={{ paddingBottom: 30 }}>
        <Searchbar
          placeholder="Search"
          value={query || ""}
          onChangeText={(text) => setQuery(text)}
          onSubmitEditing={search}
          style={{ marginTop: 16, marginHorizontal: 16 }}
        />

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Kode Pemasok</DataTable.Title>
            <DataTable.Title>Nama Pemasok</DataTable.Title>
            <DataTable.Title>Telepon Pemasok</DataTable.Title>
          </DataTable.Header>

          {complete &&
            daftarPemasok.map((pemasok, index) => (
              <DataTable.Row
                key={index}
                onPress={() => openPemasokEdit(pemasok)}>
                <DataTable.Cell>{pemasok.kodePemasok}</DataTable.Cell>
                <DataTable.Cell>{pemasok.namaPemasok}</DataTable.Cell>
                <DataTable.Cell>{pemasok.teleponPemasok}</DataTable.Cell>
              </DataTable.Row>
            ))}
        </DataTable>
      </ScrollView>

      <WidgetBaseFABCreate action={() => openPemasokCreate()} />
      <WidgetBaseLoader complete={complete} />
    </SafeAreaView>
  );
};

export default ScreenPemasokList;
