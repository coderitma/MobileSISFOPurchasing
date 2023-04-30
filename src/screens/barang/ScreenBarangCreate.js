import { memo, useCallback, useState } from "react";
import { ServiceBarangCreate } from "../../services/ServiceBarang";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";
import { Appbar, Button, TextInput } from "react-native-paper";
import WidgetBaseGroup from "../../widgets/base/WidgetBaseGroup";
import SchemaBarang from "../../schema/SchemaBarang";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import { useFocusEffect } from "@react-navigation/native";

function ScreenBarangCreate({ navigation, route }) {
  const [barang, setBarang] = useState(SchemaBarang);
  const [complete, setComplete] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const time = setTimeout(() => {
        setComplete(true);
      }, 1000);
      return () => clearTimeout(time);
    }, [])
  );

  const handleChange = (name, value) => {
    setBarang((values) => ({ ...values, [name]: value }));
  };

  const handleServiceBarangCreate = () => {
    const payload = {
      kodeBarang: barang.kodeBarang,
      namaBarang: barang.namaBarang,
      hargaBeli: parseInt(barang.hargaBeli),
      hargaJual: parseInt(barang.hargaJual),
      jumlahBarang: parseInt(barang.jumlahBarang),
    };

    ServiceBarangCreate(payload)
      .then(() => {
        navigation.goBack();
      })
      .catch(() => {});
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          disabled={!complete}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title="Tambah Barang" />
      </Appbar.Header>
      <WidgetBaseLoader complete={complete} />
      {complete && (
        <WidgetBaseContainer>
          <WidgetBaseGroup>
            <TextInput
              value={barang.kodeBarang || ""}
              onChangeText={(text) => handleChange("kodeBarang", text)}
              mode="outlined"
              label="Kode Barang"
            />
            <TextInput
              value={barang.namaBarang || ""}
              onChangeText={(text) => handleChange("namaBarang", text)}
              mode="outlined"
              label="Nama Barang"
            />

            <TextInput
              value={`${barang.hargaBeli || ""}`}
              onChangeText={(text) => handleChange("hargaBeli", parseInt(text))}
              returnKeyType={"next"}
              keyboardType={"numeric"}
              mode="outlined"
              label="Harga Beli"
            />

            <TextInput
              value={`${barang.hargaJual || ""}`}
              onChangeText={(text) => handleChange("hargaJual", parseInt(text))}
              returnKeyType={"next"}
              keyboardType={"numeric"}
              mode="outlined"
              label="Harga Jual"
            />

            <TextInput
              value={`${barang.jumlahBarang || ""}`}
              onChangeText={(text) =>
                handleChange("jumlahBarang", parseInt(text))
              }
              returnKeyType={"next"}
              keyboardType={"numeric"}
              mode="outlined"
              label="Jumlah Barang"
            />
          </WidgetBaseGroup>
          <WidgetBaseGroup>
            <Button onPress={handleServiceBarangCreate} mode="contained">
              Simpan
            </Button>
          </WidgetBaseGroup>
        </WidgetBaseContainer>
      )}
    </>
  );
}

export default memo(ScreenBarangCreate);
