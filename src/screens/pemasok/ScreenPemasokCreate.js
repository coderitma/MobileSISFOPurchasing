import { memo, useEffect, useState } from "react";
import { ServicePemasokCreate } from "../../services/ServicePemasok";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";
import { Appbar, Button, TextInput } from "react-native-paper";
import WidgetBaseGroup from "../../widgets/base/WidgetBaseGroup";
import SchemaPemasok from "../../schema/SchemaPemasok";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";

function ScreenPemasokCreate({ navigation }) {
  const [pemasok, setPemasok] = useState(SchemaPemasok);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setComplete(false);
    const timeout = setTimeout(() => {
      setComplete(true);
      clearTimeout(timeout);
    }, 1000);
  }, []);

  const handleChange = (name, value) => {
    setPemasok((values) => ({ ...values, [name]: value }));
  };

  const create = () => {
    ServicePemasokCreate(pemasok)
      .then(() => {
        navigation.goBack();
      })
      .catch(() => {});
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Tambah Pemasok" />
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

export default memo(ScreenPemasokCreate);
