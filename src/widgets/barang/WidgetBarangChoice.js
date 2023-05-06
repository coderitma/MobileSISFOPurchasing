import _ from "lodash";
import { memo, useEffect, useState } from "react";
import { Modal, View } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  DataTable,
  List,
  Portal,
  Provider,
  Searchbar,
} from "react-native-paper";
import { ServiceBarangList } from "../../services/ServiceBarang";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";

const WidgetBarangChoice = ({ onPress }) => {
  const [daftarBarang, setDaftarBarang] = useState([]);
  const [terms, setTerms] = useState("");
  const [complete, setComplete] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleServiceBarangList = (query) => {
    setComplete(false);
    setTimeout(() => {
      if (query === "QUERY_EMPTY") {
        ServiceBarangList()
          .then(({ results, pagination }) => {
            setDaftarBarang(results);
            setComplete(true);
          })
          .catch(() => {});
      } else {
        ServiceBarangList(null, terms)
          .then(({ results, pagination }) => {
            setDaftarBarang(results);
            setComplete(true);
          })
          .catch(() => {});
      }
    }, 1000);
  };

  useEffect(() => {
    handleServiceBarangList();
  }, []);

  const handleRefresh = () => {
    setTerms("");
    handleServiceBarangList("QUERY_EMPTY");
  };

  return (
    <>
      <Provider>
        <Portal>
          <Modal
            animationType="fade"
            style={{ backgroundColor: "#ffffff" }}
            visible={visible}>
            <Appbar.Header>
              <Appbar.Action
                icon="arrow-left"
                onPress={() => {
                  setVisible(false);
                }}
              />
              <Appbar.Content title="Pilih Barang" />
              <Appbar.Action icon="refresh" onPress={handleRefresh} />
            </Appbar.Header>

            <WidgetBaseContainer>
              <View>
                <Searchbar
                  placeholder="Search"
                  value={terms || ""}
                  onChangeText={(text) => {
                    setTerms(text);
                  }}
                  onSubmitEditing={() => {
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

                  {complete &&
                    daftarBarang.map((barang, index) => (
                      <DataTable.Row
                        key={index}
                        onPress={() => {
                          setTimeout(() => {
                            onPress(barang);
                            setVisible(false);
                          }, 100);
                        }}>
                        <DataTable.Cell>{barang.kodeBarang}</DataTable.Cell>
                        <DataTable.Cell>{barang.namaBarang}</DataTable.Cell>
                        <DataTable.Cell numeric>
                          {barang.hargaBeli}
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                          {barang.hargaJual}
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                </DataTable>
              </View>
            </WidgetBaseContainer>
            <WidgetBaseLoader complete={complete} />
          </Modal>
        </Portal>

        <List.Section style={{ paddingHorizontal: 16 }}>
          <List.Item
            disabled={!complete}
            title="Pilih Barang"
            onPress={() => {
              setComplete(false);
              setTimeout(() => {
                setComplete(true);
                setVisible(true);
              }, 100);
            }}
            left={() => (
              <>
                {!complete && <ActivityIndicator animating={!complete} />}
                {complete && <List.Icon icon="cube-outline" />}
              </>
            )}
          />
        </List.Section>
      </Provider>
    </>
  );
};

export default WidgetBarangChoice;
