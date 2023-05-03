import _ from "lodash";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Appbar, DataTable, Searchbar } from "react-native-paper";
import { ServiceBarangList } from "../../services/ServiceBarang";
import WidgetBaseFABCreate from "../../widgets/base/WidgetBaseFABCreate";
import { ScrollView } from "react-native-gesture-handler";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";

const ScreenBarangList = ({ navigation }) => {
  const [query, setQuery] = useState();
  const [complete, setComplete] = useState(false);
  const [daftarBarang, setDaftarBarang] = useState([]);
  const [pagination, setPagination] = useState({});

  const barangList = _.debounce((page, terms) => {
    setComplete(false);
    ServiceBarangList(page ? page : 1, terms ? terms : "")
      .then(({ results, pagination }) => {
        setPagination(pagination);
        setDaftarBarang(results);
      })
      .catch((error) => console.log(error))
      .finally(() => setComplete(true));
  }, 100);

  const paginate = (page) => {
    barangList(page, query);
  };

  const search = (e) => {
    barangList(1, e.nativeEvent.text);
  };

  const refresh = () => {
    setQuery("");
    barangList(1, "");
  };

  const openBarangEdit = _.debounce((barang) => {
    navigation.navigate("ScreenBarangEdit", { barang });
  }, 100);

  const openBarangCreate = _.debounce(() => {
    navigation.navigate("ScreenBarangCreate");
  }, 100);

  useEffect(() => {
    barangList();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={navigation.toggleDrawer} />
        <Appbar.Content title="Barang" />
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
            <DataTable.Title>Kode Barang</DataTable.Title>
            <DataTable.Title>Nama Barang</DataTable.Title>
            <DataTable.Title numeric>Harga Beli</DataTable.Title>
            <DataTable.Title numeric>Harga Jual</DataTable.Title>
          </DataTable.Header>

          {complete &&
            daftarBarang.map((barang, index) => (
              <DataTable.Row key={index} onPress={() => openBarangEdit(barang)}>
                <DataTable.Cell>{barang.kodeBarang}</DataTable.Cell>
                <DataTable.Cell>{barang.namaBarang}</DataTable.Cell>
                <DataTable.Cell numeric>{barang.hargaBeli}</DataTable.Cell>
                <DataTable.Cell numeric>{barang.hargaJual}</DataTable.Cell>
              </DataTable.Row>
            ))}
        </DataTable>
      </ScrollView>

      <WidgetBaseFABCreate action={() => openBarangCreate()} />
      <WidgetBaseLoader complete={complete} />
    </SafeAreaView>
  );
};

export default ScreenBarangList;
