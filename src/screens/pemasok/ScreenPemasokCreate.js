import _ from "lodash";
import { useEffect, useState } from "react";
import { ServicePemasokCreate } from "../../services/ServicePemasok";
import { Appbar, Button, TextInput } from "react-native-paper";
import SchemaPemasok from "../../schema/SchemaPemasok";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import { SafeAreaView, ScrollView, View } from "react-native";

const ScreenPemasokCreate = ({ navigation }) => {
  const [pemasok, setPemasok] = useState(SchemaPemasok);
  const [complete, setComplete] = useState(false);

  const handleInput = (name, value) => {
    setPemasok((values) => ({ ...values, [name]: value }));
  };

  const pemasokCreate = () => {
    setComplete(false);
    const debounce = _.debounce(() => {
      ServicePemasokCreate(pemasok)
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
        <Appbar.Content title="Tambah Pemasok" />
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
            />

            <TextInput
              value={pemasok.namaPemasok || ""}
              onChangeText={(text) => handleInput("namaPemasok", text)}
              label="Nama Pemasok"
            />

            <TextInput
              value={`${pemasok.hargaBeli || ""}`}
              onChangeText={(text) => handleInput("hargaBeli", parseInt(text))}
              returnKeyType={"next"}
              keyboardType={"numeric"}
              label="Harga Beli"
            />

            <TextInput
              value={`${pemasok.hargaJual || ""}`}
              onChangeText={(text) => handleInput("hargaJual", parseInt(text))}
              returnKeyType={"next"}
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
            <Button onPress={pemasokCreate} mode="contained">
              Simpan
            </Button>
          </View>
        </ScrollView>
      )}

      <WidgetBaseLoader complete={complete} />
    </SafeAreaView>
  );
};

export default ScreenPemasokCreate;
