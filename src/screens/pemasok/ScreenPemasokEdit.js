import { useEffect, useState } from "react";
import { Appbar, Button, TextInput } from "react-native-paper";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";
import WidgetBaseGroup from "../../widgets/base/WidgetBaseGroup";
import {
  ServicePemasokDelete,
  ServicePemasokEdit,
} from "../../services/ServicePemasok";
import { Alert } from "react-native";
import _ from "lodash";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";

function ScreenPemasokEdit({ navigation, route }) {
  const [complete, setComplete] = useState(false);
  const [pemasok, setPemasok] = useState({});

  useEffect(() => {
    const time = setTimeout(() => {
      setPemasok(route.params.pemasok);
      setComplete(true);
      clearTimeout(time);
    }, 1000);
  }, [route.params.pemasok]);

  const handleChange = (name, value) => {
    setPemasok((values) => ({ ...values, [name]: value }));
  };

  const edit = () => {
    ServicePemasokEdit(pemasok)
      .then(() => {
        navigation.goBack();
      })
      .catch(() => {});
  };

  const remove = () => {
    Alert.alert("Konfirmasi", "Yakin ingin menghapus?", [
      {
        text: "Ya",
        onPress: () => {
          ServicePemasokDelete(pemasok.kodePemasok)
            .then(() => {
              Alert.alert("Berhasil", "Pemasok berhasil dihapus!");
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
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit Pemasok" />
        <Appbar.Action icon="trash-can-outline" onPress={remove} />
      </Appbar.Header>

      {complete && (
        <WidgetBaseContainer>
          <WidgetBaseGroup>
            <TextInput
              value={pemasok.kodePemasok || ""}
              onChangeText={(text) => handleChange("kodePemasok", text)}
              mode="outlined"
              label="Kode Pemasok"
            />
            <TextInput
              value={pemasok.namaPemasok || ""}
              onChangeText={(text) => handleChange("namaPemasok", text)}
              mode="outlined"
              label="Nama Pemasok"
            />

            <TextInput
              value={`${pemasok.alamatPemasok || ""}`}
              onChangeText={(text) => handleChange("alamatPemasok", text)}
              mode="outlined"
              label="Alamat Pemasok"
            />

            <TextInput
              value={`${pemasok.teleponPemasok || ""}`}
              onChangeText={(text) => handleChange("teleponPemasok", text)}
              mode="outlined"
              label="Telepon Pemasok"
            />
          </WidgetBaseGroup>
          <WidgetBaseGroup>
            <Button onPress={edit} mode="contained">
              Simpan Perubahan
            </Button>
          </WidgetBaseGroup>
        </WidgetBaseContainer>
      )}

      <WidgetBaseLoader complete={complete} />
    </>
  );
}

export default ScreenPemasokEdit;
