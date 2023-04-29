import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useState } from "react";
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

  const handleServicePemasokList = () => {
    setDaftarPemasok([]);
    ServicePemasokList(page, terms)
      .then(({ results, pagination }) => {
        setDaftarPemasok(results);
        setPagination(pagination);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useMemo(() => {
    handleServicePemasokList();
    return "A/N";
  }, [terms, page]);

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        handleServicePemasokList();
        !complete && setComplete(true);
      }, 1000);

      return () => clearTimeout(timer);
    }, [])
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Pemasok" />
        <Appbar.Action
          icon="refresh"
          onPress={() => {
            setTerms("");
            setPage(1);
          }}
        />
        <Appbar.Action
          icon="arrow-left"
          disabled={_.isNull(pagination?.prev)}
          onPress={() => {
            setPage(pagination?.prev);
          }}
        />
        <Appbar.Action
          icon="arrow-right"
          disabled={_.isNull(pagination?.next)}
          onPress={() => {
            setPage(pagination?.next);
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
                page > 1 && setPage(1);
                setTerms(text);
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

            {daftarPemasok.length === 0 && (
              <WidgetBaseLoader complete={false} />
            )}

            {daftarPemasok.map((pemasok, index) => (
              <DataTable.Row key={index} onPress={() => {}}>
                <DataTable.Cell>{pemasok.kodePemasok}</DataTable.Cell>
                <DataTable.Cell>{pemasok.namaPemasok}</DataTable.Cell>
                <DataTable.Cell>{pemasok.teleponPemasok}</DataTable.Cell>
                <DataTable.Cell>{pemasok.alamatPemasok}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </View>
        )}
      </WidgetBaseContainer>

      <WidgetBaseFABCreate action={() => {}} />
    </>
  );
};

export default ScreenPemasokList;
