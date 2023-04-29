import _ from "lodash";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { InteractionManager, View } from "react-native";
import { Appbar, DataTable, Searchbar } from "react-native-paper";
import { ServiceBarangList } from "../../services/ServiceBarang";
import WidgetBaseFABCreate from "../../widgets/base/WidgetBaseFABCreate";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";
import { useFocusEffect } from "@react-navigation/native";

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

    return () => {};
  };

  useMemo(() => {
    handleServiceBarangList();
    return () => {};
  }, [terms, page]);

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        handleServiceBarangList();
        !complete && setComplete(true);
      }, 1000);

      return () => clearTimeout(timer);
    }, [])
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Barang" />
        <Appbar.Action
          icon="refresh"
          onPress={() => {
            setTerms("");
            setPage(1);
          }}
        />
        <Appbar.Action
          icon="arrow-left"
          disabled={_.isNull(pagination.prev)}
          onPress={() => {
            setPage(pagination.prev);
          }}
        />
        <Appbar.Action
          icon="arrow-right"
          disabled={_.isNull(pagination.next)}
          onPress={() => {
            setPage(pagination.next);
          }}
        />
      </Appbar.Header>
      <WidgetBaseLoader complete={complete} />
      <WidgetBaseContainer>
        {complete && (
          <View>
            <Searchbar
              placeholder="Search"
              value={terms || ""}
              onChangeText={(text) => {
                if (page > 1) setPage(1);
                setTerms(text);
              }}
              onSubmitEditing={handleServiceBarangList}
            />
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Kode Barang</DataTable.Title>
                <DataTable.Title>Nama Barang</DataTable.Title>
                <DataTable.Title numeric>Harga Beli</DataTable.Title>
                <DataTable.Title numeric>Harga Jual</DataTable.Title>
              </DataTable.Header>
              {daftarBarang.length === 0 && (
                <WidgetBaseLoader complete={false} />
              )}

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
    </>
  );
}

export default memo(ScreenBarangList);
