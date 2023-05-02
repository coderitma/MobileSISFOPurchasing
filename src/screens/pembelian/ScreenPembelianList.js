import _ from "lodash";
import { memo, useEffect, useState } from "react";
import { View } from "react-native";
import { Appbar, DataTable, Searchbar } from "react-native-paper";
import { ServicePembelianList } from "../../services/ServicePembelian";
import WidgetBaseFABCreate from "../../widgets/base/WidgetBaseFABCreate";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";
import {
  ServiceBaseHumanCurrency,
  ServiceBaseHumanDate,
} from "../../services/ServiceBase";

const ScreenPembelianList = memo(({ navigation }) => {
  const [daftarPembelian, setDaftarPembelian] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [terms, setTerms] = useState("");
  const [complete, setComplete] = useState(false);

  const handleServicePembelianList = (query) => {
    setComplete(false);
    setTimeout(() => {
      if (query === "QUERY_EMPTY") {
        ServicePembelianList()
          .then(({ results, pagination }) => {
            setDaftarPembelian(results);
            setPagination(pagination);
          })
          .catch(() => {})
          .finally(() => setComplete(true));
      } else {
        ServicePembelianList(page, terms)
          .then(({ results, pagination }) => {
            setDaftarPembelian(results);
            setPagination(pagination);
          })
          .catch(() => {})
          .finally(() => setComplete(true));
      }
    }, 100);
  };

  useEffect(() => {
    handleServicePembelianList();
  }, [page]);

  const handleRefresh = () => {
    setTimeout(() => {
      setPage(1);
      setTerms("");
      handleServicePembelianList("QUERY_EMPTY");
    }, 100);
  };

  const openLaporan = () => {
    navigation.navigate("ScreenPembelianReporting");
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Pembelian" />
        <Appbar.Action icon="file-table-outline" onPress={openLaporan} />
        <Appbar.Action icon="refresh" onPress={handleRefresh} />
        <Appbar.Action
          icon="arrow-left"
          disabled={_.isNull(pagination?.prev)}
          onPress={() => {
            setTimeout(() => setPage(pagination?.prev), 100);
          }}
        />
        <Appbar.Action
          icon="arrow-right"
          disabled={_.isNull(pagination?.next)}
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
                handleServicePembelianList();
              }}
            />
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Faktur</DataTable.Title>
                <DataTable.Title>Tanggal</DataTable.Title>
                <DataTable.Title>Supplier</DataTable.Title>
                <DataTable.Title numeric>Total</DataTable.Title>
              </DataTable.Header>

              {daftarPembelian.map((pembelian, index) => (
                <DataTable.Row
                  key={index}
                  onPress={() => {
                    navigation.navigate("ScreenPembelianDetail", {
                      faktur: pembelian.faktur,
                    });
                  }}>
                  <DataTable.Cell>{pembelian.faktur}</DataTable.Cell>

                  <DataTable.Cell>
                    {ServiceBaseHumanDate(pembelian.tanggal)}
                  </DataTable.Cell>

                  <DataTable.Cell>{pembelian.kodePemasok}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {ServiceBaseHumanCurrency(pembelian.total)}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </View>
        )}
      </WidgetBaseContainer>

      <WidgetBaseFABCreate
        action={() => navigation.navigate("ScreenPembelianCreate")}
      />
      <WidgetBaseLoader complete={complete} />
    </>
  );
});

export default ScreenPembelianList;
