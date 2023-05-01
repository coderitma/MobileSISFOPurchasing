import _ from "lodash";
import { memo, useEffect, useState } from "react";
import { View } from "react-native";
import { Appbar, DataTable, Searchbar } from "react-native-paper";
import { ServiceBarangList } from "../../services/ServiceBarang";
import WidgetBaseFABCreate from "../../widgets/base/WidgetBaseFABCreate";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";

const ScreenBarangList = ({ navigation }) => {
  const [daftarBarang, setDaftarBarang] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [terms, setTerms] = useState("");
  const [complete, setComplete] = useState(false);

  const handleServiceBarangList = (query) => {
    setComplete(false);
    setTimeout(() => {
      if (query === "QUERY_EMPTY") {
        ServiceBarangList()
          .then(({ results, pagination }) => {
            setDaftarBarang(results);
            setPagination(pagination);
          })
          .catch(() => {})
          .finally(() => setComplete(true));
      } else {
        ServiceBarangList(page, terms)
          .then(({ results, pagination }) => {
            setDaftarBarang(results);
            setPagination(pagination);
          })
          .catch(() => {})
          .finally(() => setComplete(true));
      }
    }, 100);
  };

  useEffect(() => {
    handleServiceBarangList();
  }, [page]);

  const handleRefresh = () => {
    setTimeout(() => {
      setPage(1);
      setTerms("");
      handleServiceBarangList("QUERY_EMPTY");
    }, 100);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Barang" />
        <Appbar.Action icon="refresh" onPress={handleRefresh} />
        <Appbar.Action
          icon="arrow-left"
          disabled={pagination?.prev}
          onPress={() => {
            setTimeout(() => setPage(pagination?.prev), 100);
          }}
        />
        <Appbar.Action
          icon="arrow-right"
          disabled={pagination?.next}
          onPress={() => {
            setTimeout(() => setPage(pagination?.next), 100);
          }}
        />
      </Appbar.Header>

      <WidgetBaseContainer>
        {complete && (
          <View>
            <Searchbar
              placeholder="Search"
              value={terms || ""}
              onChangeText={(text) => setTerms(text)}
              onSubmitEditing={() => {
                page > 1 && setPage(1);
                handleServiceBarangList();
              }}
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
