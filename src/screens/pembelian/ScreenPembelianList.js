import _ from "lodash";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Appbar, DataTable, Searchbar } from "react-native-paper";
import { ServicePembelianList } from "../../services/ServicePembelian";
import WidgetBaseFABCreate from "../../widgets/base/WidgetBaseFABCreate";
import { ScrollView } from "react-native-gesture-handler";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import {
  ServiceBaseHumanCurrency,
  ServiceBaseHumanDate,
} from "../../services/ServiceBase";

const ScreenPembelianList = ({ navigation }) => {
  const [query, setQuery] = useState();
  const [complete, setComplete] = useState(false);
  const [daftarPembelian, setDaftarPembelian] = useState([]);
  const [pagination, setPagination] = useState({});

  const pembelianList = _.debounce((page, terms) => {
    setComplete(false);
    ServicePembelianList(page ? page : 1, terms ? terms : "")
      .then(({ results, pagination }) => {
        setPagination(pagination);
        setDaftarPembelian(results);
      })
      .catch((error) => console.log(error))
      .finally(() => setComplete(true));
  }, 100);

  const paginate = (page) => {
    pembelianList(page, query);
  };

  const search = (e) => {
    pembelianList(1, e.nativeEvent.text);
  };

  const refresh = () => {
    setQuery("");
    pembelianList(1, "");
  };

  const openPembelianDetail = _.debounce((faktur) => {
    navigation.navigate("ScreenPembelianDetail", { faktur });
  }, 100);

  const openPembelianCreate = _.debounce(() => {
    navigation.navigate("ScreenPembelianCreate");
  }, 100);

  const openPembelianReporting = _.debounce(() => {
    navigation.navigate("ScreenPembelianReporting");
  }, 100);

  useEffect(() => {
    pembelianList();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={navigation.toggleDrawer} />
        <Appbar.Content title="Pembelian" />
        <Appbar.Action
          icon="table-arrow-right"
          onPress={() => openPembelianReporting()}
        />
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
            <DataTable.Title>Faktur</DataTable.Title>
            <DataTable.Title>Tanggal</DataTable.Title>
            <DataTable.Title numeric>Total</DataTable.Title>
          </DataTable.Header>

          {complete &&
            daftarPembelian.map((pembelian, index) => (
              <DataTable.Row
                key={index}
                onPress={() => openPembelianDetail(pembelian.faktur)}>
                <DataTable.Cell>{pembelian.faktur}</DataTable.Cell>
                <DataTable.Cell>
                  {ServiceBaseHumanDate(pembelian.tanggal)}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {ServiceBaseHumanCurrency(pembelian.total)}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
        </DataTable>
      </ScrollView>

      <WidgetBaseFABCreate action={() => openPembelianCreate()} />
      <WidgetBaseLoader complete={complete} />
    </SafeAreaView>
  );
};

export default ScreenPembelianList;
