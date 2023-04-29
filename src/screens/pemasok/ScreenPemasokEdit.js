import { useEffect, useState } from "react";
import {
  ServicePemasokDelete,
  ServicePemasokEdit,
} from "../../services/ServicePemasok";
import { Alert } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";
import WidgetBaseGroup from "../../widgets/base/WidgetBaseGroup";

const ScreenPemasokEdit = ({ navigation, route }) => {
  const [complete, setComplete] = useState(false);
  const [pemasok, setPemasok] = useState({});

  const handleChange = (name, value) => {
    setPemasok((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setPemasok(route.params.pemasok);
      setComplete(true);
    }, 1000);

    return () => clearTimeout(time);
  }, [route.params.pemasok]);

  const handleServicePemasokEdit = () => {
    ServicePemasokEdit(pemasok.kodePemasok, pemasok)
      .then((response) => {
        navigation.goBack();
      })
      .catch(() => {});
  };

  const handleServicePemasokDelete = () => {
    Alert.alert("Konfirmasi", "Yakin ingin menghapus?", [
      {
        text: "Yakin",
        onPress: () => {
          ServicePemasokDelete(pemasok.kodePemasok)
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
        <Appbar.Content title="Edit Pemasok" />
        <Appbar.Action
          disabled={!complete}
          icon="trash-can-outline"
          onPress={handleServicePemasokDelete}
        />
      </Appbar.Header>
      <WidgetBaseLoader complete={complete} />
      {complete && (
        <WidgetBaseContainer>
          <WidgetBaseGroup>
            <TextInput
              value={pemasok.kodePemasok || ""}
              onChangeText={(text) => handleChange("kodePemasok", text)}
              mode="outlined"
              label="Kode Pemasok"
              disabled
            />

            <TextInput
              value={pemasok.namaPemasok || ""}
              onChangeText={(text) => handleChange("namaPemasok", text)}
              mode="outlined"
              label="Nama Pemasok"
            />

            <TextInput
              value={pemasok.teleponPemasok || ""}
              onChangeText={(text) => handleChange("teleponPemasok", text)}
              mode="outlined"
              label="Telepon Pemasok"
            />

            <TextInput
              value={pemasok.alamatPemasok || ""}
              onChangeText={(text) => handleChange("alamatPemasok", text)}
              mode="outlined"
              label="Alamat Pemasok"
            />
          </WidgetBaseGroup>
          <WidgetBaseGroup>
            <Button onPress={handleServicePemasokEdit} mode="contained">
              Simpan Perubahan
            </Button>
          </WidgetBaseGroup>
        </WidgetBaseContainer>
      )}
    </>
  );
};

export default ScreenPemasokEdit;
