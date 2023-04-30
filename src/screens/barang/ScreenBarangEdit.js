import { useEffect, useMemo, useState } from "react";
import { Appbar, Button, TextInput } from "react-native-paper";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";
import WidgetBaseGroup from "../../widgets/base/WidgetBaseGroup";
import {
  ServiceBarangDelete,
  ServiceBarangEdit,
} from "../../services/ServiceBarang";
import { Alert } from "react-native";
import _ from "lodash";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";

function ScreenBarangEdit({ navigation, route }) {
  const [complete, setComplete] = useState(false);
  const [barang, setBarang] = useState({});

  const handleChange = (name, value) => {
    setBarang((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setBarang(route.params.barang);
      setComplete(true);
    }, 1000);

    return () => clearTimeout(time);
  }, [route.params.barang]);

  const handleServiceBarangEdit = () => {
    const payload = {
      namaBarang: barang.namaBarang,
      hargaBeli: parseInt(barang.hargaBeli),
      hargaJual: parseInt(barang.hargaJual),
      jumlahBarang: parseInt(barang.jumlahBarang),
    };

    ServiceBarangEdit(barang.kodeBarang, payload)
      .then(() => {
        navigation.goBack();
      })
      .catch(() => {});
  };

  const handleServiceBarangDelete = () => {
    Alert.alert("Konfirmasi", "Yakin ingin menghapus?", [
      {
        text: "Yakin",
        onPress: () => {
          ServiceBarangDelete(barang.kodeBarang)
            .then(() => {
              Alert.alert("Berhasil", "Barang berhasil dihapus!");
              navigation.goBack();
            })
            .catch(() => {});
        },
      },
      {
        text: "Batal",
        style: "cancel",
      },
    ]);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          disabled={!complete}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title="Edit Barang" />
        <Appbar.Action
          disabled={!complete}
          icon="trash-can-outline"
          onPress={handleServiceBarangDelete}
        />
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
              disabled
            />
            <TextInput
              value={barang.namaBarang || ""}
              onChangeText={(text) => handleChange("namaBarang", text)}
              mode="outlined"
              label="Nama Barang"
            />

            <TextInput
              value={`${barang.hargaBeli || ""}`}
              selectTextOnFocus
              onChangeText={(text) => handleChange("hargaBeli", parseInt(text))}
              keyboardType={"numeric"}
              mode="outlined"
              label="Harga Beli"
            />

            <TextInput
              value={`${barang.hargaJual || ""}`}
              onChangeText={(text) => handleChange("hargaJual", parseInt(text))}
              keyboardType={"numeric"}
              mode="outlined"
              label="Harga Jual"
            />

            <TextInput
              value={`${barang.jumlahBarang || ""}`}
              onChangeText={(text) =>
                handleChange("jumlahBarang", parseInt(text))
              }
              keyboardType={"numeric"}
              mode="outlined"
              label="Jumlah Barang"
            />
          </WidgetBaseGroup>
          <WidgetBaseGroup>
            <Button onPress={handleServiceBarangEdit} mode="contained">
              Simpan Perubahan
            </Button>
          </WidgetBaseGroup>
        </WidgetBaseContainer>
      )}
    </>
  );
}

export default ScreenBarangEdit;
