import _ from "lodash";
import { memo, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Appbar, DataTable, Searchbar } from "react-native-paper";
import { ServiceBarangList } from "../../services/ServiceBarang";
import WidgetBaseFABCreate from "../../widgets/base/WidgetBaseFABCreate";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";

function ScreenBarangList({ navigation }) {
  const [daftarBarang, setDaftarBarang] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [terms, setTerms] = useState("");
  const [complete, setComplete] = useState(false);

  const handleServiceBarangList = () => {
    setDaftarBarang([]);
    ServiceBarangList(page, terms)
      .then(({ results, pagination }) => {
        setDaftarBarang(results);
        setPagination(pagination);
      })
      .catch(() => {});
  };

  const disabled = useMemo(() => {
    if (_.isEmpty(daftarBarang)) return true;

    return false;
  }, [daftarBarang]);

  useEffect(() => {
    // setTimeout(() => setDaftarBarang([]), 500);
    // ServiceBaseRemoveToken()
    //   .then(() => {})
    //   .catch(() => {});
    const timeout = setTimeout(() => {
      !complete && setComplete(true);
      handleServiceBarangList();
      clearTimeout(timeout);
    }, 1000);
  }, [page]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          disabled={disabled}
          icon="menu"
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content title="Barang" />
        <Appbar.Action
          icon="refresh"
          onPress={() => {
            setTerms("");
            setPage(1);
            handleServiceBarangList();
          }}
        />
        <Appbar.Action
          icon="arrow-left"
          disabled={_.isNull(pagination.prev) || disabled}
          onPress={() => {
            setPage(pagination.prev);
          }}
        />
        <Appbar.Action
          icon="arrow-right"
          disabled={_.isNull(pagination.next) || disabled}
          onPress={() => {
            setPage(pagination.next);
          }}
        />
      </Appbar.Header>
      <WidgetBaseLoader complete={complete} />
      {complete && (
        <View style={{ flex: 1 }}>
          <Searchbar
            placeholder="Search"
            value={terms || ""}
            onChangeText={(text) => {
              setPage(1);
              setTerms(text);
            }}
            onSubmitEditing={handleServiceBarangList}
            style={{ margin: 16 }}
          />
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Kode Barang</DataTable.Title>
              <DataTable.Title>Nama Barang</DataTable.Title>
              <DataTable.Title numeric>Harga Beli</DataTable.Title>
              <DataTable.Title numeric>Harga Jual</DataTable.Title>
            </DataTable.Header>
            {daftarBarang.length === 0 && <WidgetBaseLoader complete={false} />}

            {!_.isEmpty(daftarBarang) &&
              daftarBarang.map((barang, index) => (
                <DataTable.Row
                  key={index}
                  onPress={() => {
                    navigation.navigate("ScreenBarangEdit", { barang });
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

      <WidgetBaseFABCreate
        disabled={disabled}
        action={() => navigation.navigate("ScreenBarangCreate")}
      />
    </>
  );
}

export default memo(ScreenBarangList);
