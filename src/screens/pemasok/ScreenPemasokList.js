import { useEffect, useState } from "react";
import { ServicePemasokList } from "../../services/ServicePemasok";
import { Appbar, DataTable, Searchbar } from "react-native-paper";
import _ from "lodash";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import { View } from "react-native";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";
import WidgetBaseFABCreate from "../../widgets/base/WidgetBaseFABCreate";

const ScreenPemasokList = ({ navigation }) => {
  const [daftarPemasok, setDaftarPemasok] = useState();
  const [pagination, setPagination] = useState();
  const [page, setPage] = useState(1);
  const [terms, setTerms] = useState("");
  const [complete, setComplete] = useState(false);

  const handleServicePemasokList = (query) => {
    setComplete(false);
    setTimeout(() => {
      if (query === "QUERY_EMPTY") {
        ServicePemasokList()
          .then(({ results, pagination }) => {
            setDaftarPemasok(results);
            setPagination(pagination);
          })
          .catch(() => {})
          .finally(() => setComplete(true));
      } else {
        ServicePemasokList(page, terms)
          .then(({ results, pagination }) => {
            setDaftarPemasok(results);
            setPagination(pagination);
          })
          .catch(() => {})
          .finally(() => setComplete(true));
      }
    }, 100);
  };

  useEffect(() => {
    handleServicePemasokList();
  }, [page]);

  const handleRefresh = () => {
    setTimeout(() => {
      setPage(1);
      setTerms("");
      handleServicePemasokList("QUERY_EMPTY");
    }, 100);
  };

  const handlePagination = (page) => {
    setTimeout(() => {
      setPage(page);
    }, 100);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Pemasok" />
        <Appbar.Action icon="refresh" onPress={handleRefresh} />
        <Appbar.Action
          icon="arrow-left"
          disabled={_.isNull(pagination?.prev)}
          onPress={() => handlePagination(pagination?.prev)}
        />
        <Appbar.Action
          icon="arrow-right"
          disabled={_.isNull(pagination?.next)}
          onPress={() => handlePagination(pagination?.next)}
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
                handleServicePemasokList();
              }}
            />
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Kode Pemasok</DataTable.Title>
                <DataTable.Title>Nama Pemasok</DataTable.Title>
                <DataTable.Title>Telepon</DataTable.Title>
                <DataTable.Title>Alamat</DataTable.Title>
              </DataTable.Header>
            </DataTable>

            {daftarPemasok.map((pemasok, index) => (
              <DataTable.Row
                key={index}
                onPress={() =>
                  navigation.navigate("ScreenPemasokEdit", { pemasok })
                }>
                <DataTable.Cell>{pemasok.kodePemasok}</DataTable.Cell>
                <DataTable.Cell>{pemasok.namaPemasok}</DataTable.Cell>
                <DataTable.Cell>{pemasok.teleponPemasok}</DataTable.Cell>
                <DataTable.Cell>{pemasok.alamatPemasok}</DataTable.Cell>
              </DataTable.Row>
            ))}
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

export default ScreenPemasokList;
