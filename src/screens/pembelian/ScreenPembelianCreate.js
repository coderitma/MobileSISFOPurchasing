import _ from "lodash";
import { memo, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import {
  Appbar,
  DataTable,
  Divider,
  List,
  TextInput,
} from "react-native-paper";
import WidgetBaseFABCreate from "../../widgets/base/WidgetBaseFABCreate";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";
import ServiceBaseRandomID, {
  ServiceBaseActivity,
  ServiceBaseHumanCurrency,
  ServiceBaseHumanDate,
  ServiceBaseIsDuplicateArray,
} from "../../services/ServiceBase";
import WidgetBarangChoice from "../../widgets/barang/WidgetBarangChoice";
import WidgetPemasokChoice from "../../widgets/pemasok/WidgetPemasokChoice";
import SchemaPemasok from "../../schema/SchemaPemasok";
import WidgetBaseGroup from "../../widgets/base/WidgetBaseGroup";
import SchemaPembelian from "../../schema/SchemaPembelian";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ServicePembelianCreate } from "../../services/ServicePembelian";

const ScreenPembelianCreate = memo(({ navigation }) => {
  const [pembelian, setPembelian] = useState(SchemaPembelian);
  const [daftarItemBeli, setDaftarItemBeli] = useState([]);
  const [pemasok, setPemasok] = useState(SchemaPemasok);
  const [complete, setComplete] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setComplete(false);
    setTimeout(() => {
      setComplete(true);
    }, 1000);
  }, []);

  const handleChange = (name, value) => {
    if (name === "tanggal") setShowDatePicker(false);
    setPembelian((values) => ({ ...values, [name]: value }));
  };

  const handleChangeItemBeli = (index, value, item) => {
    setDaftarItemBeli((values) => {
      const qty = parseInt(value);
      const items = [...values];

      if (qty === 0) {
        items.splice(index, 1);
      } else {
        items[index].jumlahBeli = qty;
        items[index].subtotal = item.jumlahBeli * item.hargaBeli;
      }

      return items;
    });
  };

  const updateItem = (item) => {
    // setComplete(false);
    setTimeout(() => {
      setDaftarItemBeli((values) => {
        const items = [...values];
        const b = items.find((value) => value.kodeBarang === item.kodeBarang);
        const i = items.findIndex(
          (value) => value.kodeBarang === item.kodeBarang
        );
        b.jumlahBeli = b.jumlahBeli + 1;
        b.subtotal = b.jumlahBeli * b.hargaBeli;
        items[i] = b;
        // setComplete(true);
        return items;
      });
    }, 100);
  };

  const addItem = (item) => {
    // setComplete(false);
    setTimeout(() => {
      const payload = {
        kodeBarang: item.kodeBarang,
        namaBarang: item.namaBarang,
        hargaBeli: item.hargaBeli,
        jumlahBeli: 1,
        subtotal: 1 * item.hargaBeli,
      };

      setDaftarItemBeli((values) => [...values, payload]);
      // setComplete(true);
    }, 100);
  };

  const addOrUpdateItem = (item) => {
    const isDuplicate = ServiceBaseIsDuplicateArray(
      daftarItemBeli,
      item.kodeBarang,
      "kodeBarang"
    );
    if (isDuplicate) {
      updateItem(item);
    } else {
      addItem(item);
    }
  };

  const addPemasok = (pemasok) => {
    setTimeout(() => {
      setPemasok(pemasok);
    }, 100);
  };

  const calculateTotal = useMemo(() => daftarItemBeli.length, [daftarItemBeli]);

  const calculateSubtotal = useMemo(() => {
    const total = _.sumBy(daftarItemBeli, "subtotal");
    handleChange("total", total);
    return total;
  }, [daftarItemBeli]);

  const calculateBayar = useMemo(() => {
    const kembalian = pembelian.dibayar - calculateSubtotal;
    handleChange("kembali", kembalian);
    return kembalian;
  }, [daftarItemBeli, pembelian.dibayar]);

  const handleServicePembelianCreate = () => {
    pembelian.kodePemasok = pemasok.kodePemasok;

    const payload = {
      ...pembelian,
      items: [...daftarItemBeli],
    };

    setComplete(false);

    ServicePembelianCreate(payload)
      .then((data) => {
        console.log(data);
      })
      .catch(() => {})
      .finally(() => setComplete(true));
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          icon="arrow-left"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Pilih Item" />
        <Appbar.Action
          icon="trash-can-outline"
          onPress={() => {
            setComplete(false);
            ServiceBaseActivity(() => {
              setDaftarItemBeli([]);
              setPemasok(SchemaPemasok);
              setComplete(true);
            });
          }}
        />
      </Appbar.Header>

      {complete && (
        <WidgetBaseContainer style={{ marginHorizontal: 0 }}>
          <View>
            <WidgetBaseContainer>
              <WidgetBaseGroup>
                <TextInput
                  value={`${pembelian.faktur}`}
                  onChangeText={(text) => handleChange("faktur", text)}
                  label="Nomor Faktur"
                  mode="outlined"
                  editable={false}
                  right={
                    <TextInput.Icon
                      onPress={() => {
                        setTimeout(
                          () =>
                            handleChange("faktur", ServiceBaseRandomID("BELI")),
                          100
                        );
                      }}
                      icon="reload"
                    />
                  }
                />
                <TextInput
                  label="Tanggal"
                  mode="outlined"
                  editable={false}
                  value={`${ServiceBaseHumanDate(pembelian.tanggal)}`}
                  right={
                    <TextInput.Icon
                      onPress={() => setShowDatePicker(true)}
                      icon="calendar"
                    />
                  }
                />
                {showDatePicker && (
                  <DateTimePicker
                    value={pembelian.tanggal || new Date()}
                    mode={"date"}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    is24Hour={true}
                    onChange={(event, value) => handleChange("tanggal", value)}
                  />
                )}
              </WidgetBaseGroup>
            </WidgetBaseContainer>
            <WidgetPemasokChoice onPress={(item) => addPemasok(item)} />
            <Divider />
            {!_.isEmpty(pemasok.kodePemasok) && (
              <List.Item
                title={pemasok.namaPemasok}
                description={pemasok.teleponPemasok}
              />
            )}
            <Divider />
            <WidgetBarangChoice onPress={(item) => addOrUpdateItem(item)} />
            <Divider />
            {daftarItemBeli.map((barang, index) => (
              <View key={index}>
                <Divider />
                <List.Item
                  key={index}
                  title={`${barang.namaBarang} #${barang.kodeBarang}`}
                  description={ServiceBaseHumanCurrency(barang.hargaBeli)}
                  right={(props) => (
                    <>
                      <TextInput
                        key={index}
                        mode="outlined"
                        value={`${daftarItemBeli[index].jumlahBeli || ""}`}
                        onChangeText={(text) =>
                          handleChangeItemBeli(index, text, barang)
                        }
                      />
                    </>
                  )}
                />
              </View>
            ))}
            <Divider />
            <DataTable>
              <DataTable.Row>
                <DataTable.Title>Jumlah Item</DataTable.Title>
                <DataTable.Cell numeric>
                  {calculateTotal || 0} item
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Title>Total</DataTable.Title>
                <DataTable.Cell numeric>
                  {ServiceBaseHumanCurrency(calculateSubtotal) || 0}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>

            <WidgetBaseContainer>
              <WidgetBaseGroup>
                <TextInput
                  value={`${pembelian.dibayar || ""}`}
                  error={calculateBayar < 0}
                  onChangeText={(text) =>
                    handleChange("dibayar", parseInt(text))
                  }
                  label="Dibayar"
                  mode="outlined"
                  right={
                    <TextInput.Icon
                      onPress={() => {
                        setTimeout(
                          () => handleChange("dibayar", calculateSubtotal),
                          100
                        );
                      }}
                      icon="auto-fix"
                    />
                  }
                />
                <TextInput
                  value={`${calculateBayar}`}
                  error={calculateBayar < 0}
                  label="Kembali"
                  disabled={true}
                  mode="outlined"
                />
              </WidgetBaseGroup>
            </WidgetBaseContainer>
          </View>
        </WidgetBaseContainer>
      )}

      <WidgetBaseFABCreate
        disabled={calculateBayar < 0}
        icon="content-save-all-outline"
        action={handleServicePembelianCreate}
      />

      <WidgetBaseLoader complete={complete} />
    </>
  );
});

export default ScreenPembelianCreate;
