import _ from "lodash";
import { useEffect, useState } from "react";
import { ServiceBarangCreate } from "../../services/ServiceBarang";
import { Appbar, Button, TextInput } from "react-native-paper";
import SchemaBarang from "../../schema/SchemaBarang";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import { SafeAreaView, ScrollView, View } from "react-native";

const ScreenBarangCreate = ({ navigation }) => {
  const [barang, setBarang] = useState(SchemaBarang);
  const [complete, setComplete] = useState(false);

  const handleInput = (name, value) => {
    setBarang((values) => ({ ...values, [name]: value }));
  };

  const barangCreate = () => {
    setComplete(false);
    const debounce = _.debounce(() => {
      ServiceBarangCreate(barang)
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setComplete(true));
    }, 1000);
    debounce();
  };

  useEffect(() => {
    setComplete(false);
    const debounce = _.debounce(() => setComplete(true), 1000);
    debounce();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Tambah Barang" />
      </Appbar.Header>

      {complete && (
        <ScrollView
          style={{
            marginVertical: 24,
            marginHorizontal: 24,
          }}>
          <View style={{ gap: 24 }}>
            <TextInput
              value={barang.kodeBarang || ""}
              onChangeText={(text) => handleInput("kodeBarang", text)}
              label="Kode Barang"
            />

            <TextInput
              value={barang.namaBarang || ""}
              onChangeText={(text) => handleInput("namaBarang", text)}
              label="Nama Barang"
            />

            <TextInput
              value={`${barang.hargaBeli || ""}`}
              onChangeText={(text) => handleInput("hargaBeli", parseInt(text))}
              returnKeyType={"next"}
              keyboardType={"numeric"}
              label="Harga Beli"
            />

            <TextInput
              value={`${barang.hargaJual || ""}`}
              onChangeText={(text) => handleInput("hargaJual", parseInt(text))}
              returnKeyType={"next"}
              keyboardType={"numeric"}
              label="Harga Jual"
            />

            <TextInput
              value={`${barang.jumlahBarang || ""}`}
              onChangeText={(text) =>
                handleInput("jumlahBarang", parseInt(text))
              }
              keyboardType={"numeric"}
              label="Jumlah Barang"
            />
            <Button onPress={barangCreate} mode="contained">
              Simpan
            </Button>
          </View>
        </ScrollView>
      )}

      <WidgetBaseLoader complete={complete} />
    </SafeAreaView>
  );
};

export default ScreenBarangCreate;
