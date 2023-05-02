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
import { ServicePemasokList } from "../../services/ServicePemasok";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";

const WidgetPemasokChoice = memo(({ onPress }) => {
  const [daftarPemasok, setDaftarPemasok] = useState([]);
  const [terms, setTerms] = useState("");
  const [complete, setComplete] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleServicePemasokList = (query) => {
    setComplete(false);
    setTimeout(() => {
      if (query === "QUERY_EMPTY") {
        ServicePemasokList()
          .then(({ results, pagination }) => {
            setDaftarPemasok(results);
            setComplete(true);
          })
          .catch(() => {});
      } else {
        ServicePemasokList(null, terms)
          .then(({ results, pagination }) => {
            setDaftarPemasok(results);
            setComplete(true);
          })
          .catch(() => {});
      }
    }, 1000);
  };

  useEffect(() => {
    handleServicePemasokList();
  }, []);

  const handleRefresh = () => {
    setTerms("");
    handleServicePemasokList("QUERY_EMPTY");
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
              <Appbar.Content title="Pilih Pemasok" />
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
                    handleServicePemasokList();
                  }}
                />

                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Kode Pemasok</DataTable.Title>
                    <DataTable.Title>Nama Pemasok</DataTable.Title>
                    <DataTable.Title numeric>Alamat Pemasok</DataTable.Title>
                    <DataTable.Title numeric>Telepon Pemasok</DataTable.Title>
                  </DataTable.Header>

                  {complete &&
                    daftarPemasok.map((pemasok, index) => (
                      <DataTable.Row
                        key={index}
                        onPress={() => {
                          setTimeout(() => {
                            onPress(pemasok);
                            setVisible(false);
                          }, 100);
                        }}>
                        <DataTable.Cell>{pemasok.kodePemasok}</DataTable.Cell>
                        <DataTable.Cell>{pemasok.namaPemasok}</DataTable.Cell>
                        <DataTable.Cell>{pemasok.alamatPemasok}</DataTable.Cell>
                        <DataTable.Cell>
                          {pemasok.teleponPemasok}
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
            title="Pilih Pemasok"
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
                {complete && <List.Icon icon="account-search-outline" />}
              </>
            )}
          />
        </List.Section>
      </Provider>
    </>
  );
});

export default WidgetPemasokChoice;
