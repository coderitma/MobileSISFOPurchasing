import _ from "lodash";
import { memo, useEffect, useState } from "react";
import { View } from "react-native";
import { Appbar, DataTable, Searchbar } from "react-native-paper";
import { ServiceBarangList } from "../../services/ServiceBarang";
import WidgetBaseFABCreate from "../../widgets/base/WidgetBaseFABCreate";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";

const ScreenBarangList = ({ navigation }) => {
  const [terms, setTerms] = useState();
  const [page, setPage] = useState();
  const [complete, setComplete] = useState(false);
  const [daftarBarang, setDaftarBarang] = useState([]);
  const [pagination, setPagination] = useState({});

  const getAll = () => {
    setComplete(false);
    ServiceBarangList(page, terms)
      .then(({ results, pagination }) => {
        setDaftarBarang(results);
        setPagination(pagination);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setComplete(true));
  };

  useEffect(() => {
    getAll();
  }, [page]);

  const search = () => {
    setPage(1);
    getAll();
  };

  const reload = () => {
    setTerms("");
    setPage(1);
    setComplete(false);
    ServiceBarangList(1, null)
      .then(({ results, pagination }) => {
        setDaftarBarang(results);
        setPagination(pagination);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setComplete(true));
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Barang" />
        <Appbar.Action icon="refresh" onPress={reload} />
        <Appbar.Action
          icon="arrow-left"
          disabled={_.isNull(pagination?.prev)}
          onPress={() => setPage(pagination?.prev)}
        />
        <Appbar.Action
          icon="arrow-right"
          disabled={_.isNull(pagination?.next)}
          onPress={() => setPage(pagination?.next)}
        />
      </Appbar.Header>

      <WidgetBaseContainer>
        {complete && (
          <View>
            <Searchbar
              placeholder="Search"
              value={terms}
              onChangeText={(text) => setTerms(text)}
              onSubmitEditing={search}
            />
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Kode Barang</DataTable.Title>
                <DataTable.Title>Nama Barang</DataTable.Title>
                <DataTable.Title numeric>Harga Beli</DataTable.Title>
                <DataTable.Title numeric>Harga Jual</DataTable.Title>
              </DataTable.Header>

              {daftarBarang.map((barang, index) => (
                <DataTable.Row
                  key={index}
                  onPress={() => {
                    navigation.navigate("ScreenBarangEdit", {
                      barang,
                    });
                  }}>
                  <DataTable.Cell>{barang.kodeBarang}</DataTable.Cell>
                  <DataTable.Cell>{barang.namaBarang}</DataTable.Cell>
                  <DataTable.Cell numeric>{barang.hargaBeli}</DataTable.Cell>
                  <DataTable.Cell numeric>{barang.hargaJual}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </View>
        )}
      </WidgetBaseContainer>

      <WidgetBaseFABCreate
        action={() => navigation.navigate("ScreenBarangCreate")}
      />
      <WidgetBaseLoader complete={complete} />
    </>
  );
};

export default memo(ScreenBarangList);
