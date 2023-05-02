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

const ScreenPembelianList = ({ navigation }) => {
  const [terms, setTerms] = useState();
  const [page, setPage] = useState();
  const [complete, setComplete] = useState(false);
  const [daftarPembelian, setDaftarPembelian] = useState([]);
  const [pagination, setPagination] = useState({});

  const getAll = () => {
    setComplete(false);
    ServicePembelianList(page, terms)
      .then(({ results, pagination }) => {
        setDaftarPembelian(results);
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
    ServicePembelianList(1, null)
      .then(({ results, pagination }) => {
        setDaftarPembelian(results);
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
        <Appbar.Content title="Pembelian" />
        <Appbar.Action
          icon="table-arrow-right"
          onPress={() => navigation.navigate("ScreenPembelianReporting")}
        />
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
                <DataTable.Title>Faktur</DataTable.Title>
                <DataTable.Title>Tanggal</DataTable.Title>
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
};

export default memo(ScreenPembelianList);
