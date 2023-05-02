import { memo, useEffect, useState } from "react";
import { ServiceBarangCreate } from "../../services/ServiceBarang";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";
import { Appbar, Button, TextInput } from "react-native-paper";
import WidgetBaseGroup from "../../widgets/base/WidgetBaseGroup";
import SchemaBarang from "../../schema/SchemaBarang";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";

function ScreenBarangCreate({ navigation }) {
  const [barang, setBarang] = useState(SchemaBarang);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setComplete(false);
    const timeout = setTimeout(() => {
      setComplete(true);
      clearTimeout(timeout);
    }, 1000);
  }, []);

  const handleChange = (name, value) => {
    setBarang((values) => ({ ...values, [name]: value }));
  };

  const create = () => {
    ServiceBarangCreate(barang)
      .then(() => {
        navigation.goBack();
      })
      .catch(() => {});
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Tambah Barang" />
      </Appbar.Header>

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
            <Button onPress={create} mode="contained">
              Simpan
            </Button>
          </WidgetBaseGroup>
        </WidgetBaseContainer>
      )}
      <WidgetBaseLoader complete={complete} />
    </>
  );
}

export default memo(ScreenBarangCreate);
