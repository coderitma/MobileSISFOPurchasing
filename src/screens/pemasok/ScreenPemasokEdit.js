import { useEffect, useState } from "react";
import { Appbar, Button, TextInput } from "react-native-paper";
import {
  ServicePemasokDelete,
  ServicePemasokEdit,
} from "../../services/ServicePemasok";
import { Alert, SafeAreaView, View } from "react-native";
import _ from "lodash";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import { ScrollView } from "react-native-gesture-handler";

const ScreenPemasokEdit = ({ navigation, route }) => {
  const [complete, setComplete] = useState(false);
  const [pemasok, setPemasok] = useState({});

  const handleInput = (name, value) => {
    setPemasok((values) => ({ ...values, [name]: value }));
  };

  const pemasokEdit = () => {
    setComplete(false);
    const debounce = _.debounce(() => {
      ServicePemasokEdit(pemasok)
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
        onPress: () => pemasokDelete(),
      },
      {
        text: "Batal",
        style: "cancel",
      },
    ];

    Alert.alert("Konfirmasi", "Ingin dihapus?", actions);
  };

  const pemasokDelete = () => {
    const debounce = _.debounce(() => {
      ServicePemasokDelete(pemasok.kodePemasok)
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
      setPemasok(route.params.pemasok);
      setComplete(true);
    }, 1000);
    debounce();
  }, [route.params.pemasok]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit Pemasok" />
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
              value={pemasok.kodePemasok || ""}
              onChangeText={(text) => handleInput("kodePemasok", text)}
              label="Kode Pemasok"
              disabled
            />
            <TextInput
              value={pemasok.namaPemasok || ""}
              onChangeText={(text) => handleInput("namaPemasok", text)}
              label="Nama Pemasok"
            />

            <TextInput
              value={`${pemasok.hargaBeli || ""}`}
              onChangeText={(text) => handleInput("hargaBeli", parseInt(text))}
              keyboardType={"numeric"}
              label="Harga Beli"
            />

            <TextInput
              value={`${pemasok.hargaJual || ""}`}
              onChangeText={(text) => handleInput("hargaJual", parseInt(text))}
              keyboardType={"numeric"}
              label="Harga Jual"
            />

            <TextInput
              value={`${pemasok.jumlahPemasok || ""}`}
              onChangeText={(text) =>
                handleInput("jumlahPemasok", parseInt(text))
              }
              keyboardType={"numeric"}
              label="Jumlah Pemasok"
            />

            <Button onPress={pemasokEdit} mode="contained">
              Simpan Perubahan
            </Button>
          </View>
        </ScrollView>
      )}
      <WidgetBaseLoader complete={complete} />
    </SafeAreaView>
  );
};

export default ScreenPemasokEdit;
