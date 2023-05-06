import _ from "lodash";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import {
  Appbar,
  Button,
  DataTable,
  Divider,
  List,
  TextInput,
} from "react-native-paper";
import WidgetBaseFABCreate from "../../widgets/base/WidgetBaseFABCreate";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import ServiceBaseRandomID, {
  ServiceBaseFileSharing,
  ServiceBaseHumanCurrency,
  ServiceBaseHumanDate,
  ServiceBaseIsDuplicateArray,
} from "../../services/ServiceBase";
import WidgetBarangChoice from "../../widgets/barang/WidgetBarangChoice";
import WidgetPemasokChoice from "../../widgets/pemasok/WidgetPemasokChoice";
import SchemaPemasok from "../../schema/SchemaPemasok";
import SchemaPembelian from "../../schema/SchemaPembelian";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  ServicePembelianCreate,
  ServicePembelianPrint,
} from "../../services/ServicePembelian";
import { ScrollView } from "react-native-gesture-handler";

const ScreenPembelianCreate = memo(({ navigation }) => {
  const [pembelian, setPembelian] = useState(SchemaPembelian);
  const [daftarItemBeli, setDaftarItemBeli] = useState([]);
  const [pemasok, setPemasok] = useState(SchemaPemasok);
  const [complete, setComplete] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInput = (name, value) => {
    if (name === "tanggal") setShowDatePicker(false);
    setPembelian((values) => ({ ...values, [name]: value }));
  };

  const randomFaktur = () => {
    handleInput("faktur", ServiceBaseRandomID("BELI"));
  };

  const handleInputItemBeli = (index, value, item) => {
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

  const update = (item) => {
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
        return items;
      });
    }, 100);
  };

  const add = (item) => {
    setTimeout(() => {
      const payload = {
        kodeBarang: item.kodeBarang,
        namaBarang: item.namaBarang,
        hargaBeli: item.hargaBeli,
        jumlahBeli: 1,
        subtotal: 1 * item.hargaBeli,
      };

      setDaftarItemBeli((values) => [...values, payload]);
    }, 100);
  };

  const addOrUpdate = useCallback(
    (item) => {
      const isDuplicate = ServiceBaseIsDuplicateArray(
        daftarItemBeli,
        item.kodeBarang,
        "kodeBarang"
      );
      if (isDuplicate) {
        update(item);
      } else {
        add(item);
      }
    },
    [daftarItemBeli]
  );

  const addPemasok = (pemasok) => {
    setTimeout(() => {
      setPemasok(pemasok);
    }, 100);
  };

  const calculateTotal = useMemo(() => daftarItemBeli.length, [daftarItemBeli]);

  const calculateSubtotal = useMemo(() => {
    const total = _.sumBy(daftarItemBeli, "subtotal");
    handleInput("total", total);
    return total;
  }, [daftarItemBeli]);

  const calculateBayar = useMemo(() => {
    const kembalian = pembelian.dibayar - calculateSubtotal;
    handleInput("kembali", kembalian);
    return kembalian;
  }, [daftarItemBeli, pembelian.dibayar]);

  const askShare = () => {
    const actions = [
      {
        text: "Ya",
        onPress: pembelianPrint,
      },
      {
        text: "Batal",
        onPress: navigation.goBack,
        style: "cancel",
      },
    ];

    Alert.alert("Share Faktur?", null, actions);
  };

  const pembelianPrint = () => {
    setComplete(false);
    const debounce = _.debounce(() => {
      ServicePembelianPrint(pembelian.faktur)
        .then(async (blob) => {
          ServiceBaseFileSharing("FAKTUR", blob);
          clear();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setComplete(true);
          navigation.goBack();
        });
    }, 1000);

    debounce();
  };

  const pembelianCreate = () => {
    setComplete(false);

    const debounce = _.debounce(() => {
      pembelian.kodePemasok = pemasok.kodePemasok;

      const payload = {
        ...pembelian,
        items: [...daftarItemBeli],
      };

      setComplete(false);

      ServicePembelianCreate(payload)
        .then((data) => {
          askShare();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setComplete(true);
        });
    }, 1000);

    debounce();
  };

  const clear = () => {
    setDaftarItemBeli([]);
    setPemasok(SchemaPemasok);
    setComplete(true);
    setPembelian(SchemaPembelian);
  };

  useEffect(() => {
    setComplete(false);
    const debounce = _.debounce(() => {
      setComplete(true);
    }, 1000);
    debounce();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Action
          icon="arrow-left"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Buat Transaksi Pembelian" />
        <Appbar.Action icon="trash-can-outline" onPress={clear} />
      </Appbar.Header>
      {complete && (
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
          <View style={{ marginHorizontal: 16, gap: 16, marginVertical: 24 }}>
            <TextInput
              value={`${pembelian.faktur}`}
              onChangeText={(text) => handleInput("faktur", text)}
              label="Nomor Faktur"
              mode="outlined"
              editable={false}
              right={<TextInput.Icon onPress={randomFaktur} icon="reload" />}
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
          </View>
          <Divider />
          {showDatePicker && (
            <DateTimePicker
              value={pembelian.tanggal || new Date()}
              mode={"date"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={true}
              onChange={(event, value) => handleInput("tanggal", value)}
            />
          )}

          <WidgetPemasokChoice onPress={(item) => addPemasok(item)} />
          {!_.isEmpty(pemasok.kodePemasok) && (
            <List.Item
              title={pemasok.namaPemasok}
              description={pemasok.teleponPemasok}
            />
          )}
          <Divider />

          <WidgetBarangChoice onPress={(item) => addOrUpdate(item)} />
          {daftarItemBeli.map((barang, index) => (
            <View key={index}>
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
                        handleInputItemBeli(index, text, barang)
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
            <DataTable.Row>
              <DataTable.Title>Kembali</DataTable.Title>
              <DataTable.Cell numeric>
                {ServiceBaseHumanCurrency(calculateBayar) || 0}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
          <View style={{ marginHorizontal: 16, gap: 16, marginVertical: 24 }}>
            <TextInput
              value={`${pembelian.dibayar || ""}`}
              error={calculateBayar < 0}
              onChangeText={(text) => handleInput("dibayar", parseInt(text))}
              label="Dibayar"
              mode="outlined"
              right={
                <TextInput.Icon
                  onPress={() => {
                    setTimeout(
                      () => handleInput("dibayar", calculateSubtotal),
                      100
                    );
                  }}
                  icon="auto-fix"
                />
              }
            />
            <Button
              mode="contained"
              disabled={calculateBayar < 0}
              onPress={pembelianCreate}>
              Simpan
            </Button>
          </View>
        </ScrollView>
      )}
      <WidgetBaseLoader complete={complete} />
    </SafeAreaView>
  );
});

export default ScreenPembelianCreate;
