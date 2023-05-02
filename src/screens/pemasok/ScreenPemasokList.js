import _ from "lodash";
import { memo, useEffect, useState } from "react";
import { View } from "react-native";
import { Appbar, DataTable, Searchbar } from "react-native-paper";
import { ServicePemasokList } from "../../services/ServicePemasok";
import WidgetBaseFABCreate from "../../widgets/base/WidgetBaseFABCreate";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";

const ScreenPemasokList = ({ navigation }) => {
  const [terms, setTerms] = useState();
  const [page, setPage] = useState();
  const [complete, setComplete] = useState(false);
  const [daftarPemasok, setDaftarPemasok] = useState([]);
  const [pagination, setPagination] = useState({});

  const getAll = () => {
    setComplete(false);
    ServicePemasokList(page, terms)
      .then(({ results, pagination }) => {
        setDaftarPemasok(results);
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
    ServicePemasokList(1, null)
      .then(({ results, pagination }) => {
        setDaftarPemasok(results);
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
        <Appbar.Content title="Pemasok" />
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
                <DataTable.Title>Kode Pemasok</DataTable.Title>
                <DataTable.Title>Nama Pemasok</DataTable.Title>
                <DataTable.Title>Alamat Pemasok</DataTable.Title>
                <DataTable.Title>Telepon Pemasok</DataTable.Title>
              </DataTable.Header>

              {daftarPemasok.map((pemasok, index) => (
                <DataTable.Row
                  key={index}
                  onPress={() => {
                    navigation.navigate("ScreenPemasokEdit", {
                      pemasok,
                    });
                  }}>
                  <DataTable.Cell>{pemasok.kodePemasok}</DataTable.Cell>
                  <DataTable.Cell>{pemasok.namaPemasok}</DataTable.Cell>
                  <DataTable.Cell>{pemasok.alamatPemasok}</DataTable.Cell>
                  <DataTable.Cell>{pemasok.teleponPemasok}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </View>
        )}
      </WidgetBaseContainer>

      <WidgetBaseFABCreate
        action={() => navigation.navigate("ScreenPemasokCreate")}
      />
      <WidgetBaseLoader complete={complete} />
    </>
  );
};

export default memo(ScreenPemasokList);
