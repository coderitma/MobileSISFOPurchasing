import { useEffect, useState } from "react";
import { Appbar, Button, TextInput } from "react-native-paper";
import {
  ServiceBarangDelete,
  ServiceBarangEdit,
} from "../../services/ServiceBarang";
import { Alert, SafeAreaView, View } from "react-native";
import _ from "lodash";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import { ScrollView } from "react-native-gesture-handler";

const ScreenBarangEdit = ({ navigation, route }) => {
  const [complete, setComplete] = useState(false);
  const [barang, setBarang] = useState({});

  const handleInput = (name, value) => {
    setBarang((values) => ({ ...values, [name]: value }));
  };

  const barangEdit = () => {
    setComplete(false);
    const debounce = _.debounce(() => {
      ServiceBarangEdit(barang)
        .then(() => {
          Alert.alert("Notifikasi", "Berhasil");
          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setComplete(true));
    }, 1000);

    debounce();
  };

  const askDelete = () => {
    const actions = [
      {
        text: "Ya",
        onPress: () => barangDelete(),
      },
      {
        text: "Batal",
        style: "cancel",
      },
    ];

    Alert.alert("Konfirmasi", "Ingin dihapus?", actions);
  };

  const barangDelete = () => {
    const debounce = _.debounce(() => {
      ServiceBarangDelete(barang.kodeBarang)
        .then(() => {
          Alert.alert("Notifikasi", "Berhasil");
          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
        });
    }, 100);

    debounce();
  };

  useEffect(() => {
    setComplete(false);
    const debounce = _.debounce(() => {
      setBarang(route.params.barang);
      setComplete(true);
    }, 1000);
    debounce();
  }, [route.params.barang]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit Barang" />
        <Appbar.Action icon="trash-can-outline" onPress={askDelete} />
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
              disabled
            />
            <TextInput
              value={barang.namaBarang || ""}
              onChangeText={(text) => handleInput("namaBarang", text)}
              label="Nama Barang"
            />

            <TextInput
              value={`${barang.hargaBeli || ""}`}
              onChangeText={(text) => handleInput("hargaBeli", parseInt(text))}
              keyboardType={"numeric"}
              label="Harga Beli"
            />

            <TextInput
              value={`${barang.hargaJual || ""}`}
              onChangeText={(text) => handleInput("hargaJual", parseInt(text))}
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

            <Button onPress={barangEdit} mode="contained">
              Simpan Perubahan
            </Button>
          </View>
        </ScrollView>
      )}
      <WidgetBaseLoader complete={complete} />
    </SafeAreaView>
  );
};

export default ScreenBarangEdit;
