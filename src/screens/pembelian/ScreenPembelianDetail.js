import { memo, useEffect, useState } from "react";
import {
  ServicePembelianDetail,
  ServicePembelianPrint,
} from "../../services/ServicePembelian";
import { Alert, SafeAreaView, ScrollView, View } from "react-native";
import { Appbar, Divider, List, Text } from "react-native-paper";
import SchemaPembelian from "../../schema/SchemaPembelian";
import {
  ServiceBaseFileSharing,
  ServiceBaseHumanCurrency,
  ServiceBaseHumanDate,
} from "../../services/ServiceBase";
import _ from "lodash";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";

const ScreenPembelianDetail = memo(({ navigation, route }) => {
  const [complete, setComplete] = useState(false);
  const [pembelian, setPembelian] = useState(SchemaPembelian);
  const [daftarItemBeli, setDaftarItemBeli] = useState([]);

  const askShare = () => {
    const actions = [
      {
        text: "Ya",
        onPress: pembelianPrint,
      },
      {
        text: "Kembali",
        onPress: () => navigation.goBack(),
        style: "cancel",
      },
    ];

    Alert.alert("Cetak Faktur?", null, actions);
  };

  const pembelianPrint = () => {
    setComplete(false);
    const debounce = _.debounce(() => {
      ServicePembelianPrint(pembelian.faktur)
        .then((blob) => {
          ServiceBaseFileSharing("FAKTUR", blob);
          Alert.alert("Notifikasi", "Berhasil");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setComplete(true);
          navigation.goBack();
        });
    }, 1000);

    debounce();
  };

  useEffect(() => {
    setComplete(false);
    const debounce = _.debounce(() => {
      ServicePembelianDetail(route.params.faktur)
        .then(({ pembelian, items }) => {
          setPembelian(pembelian);
          setDaftarItemBeli(items);
        })
        .catch(() => {})
        .finally(() => setComplete(true));
    }, 1000);

    debounce();
  }, [route.params.faktur]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Detail Pembelian" />
        <Appbar.Action
          icon="share-variant-outline"
          onPress={() => askShare()}
        />
      </Appbar.Header>
      {complete && (
        <ScrollView>
          <List.Section>
            <List.Subheader>Pembelian</List.Subheader>
            <List.Item
              title="No. Faktur"
              right={() => <Text>{pembelian.faktur}</Text>}
            />
            <List.Item
              title="Tanggal Transaksi"
              right={() => (
                <Text>{ServiceBaseHumanDate(pembelian.tanggal)}</Text>
              )}
            />
            <List.Item
              title="Kode Pemasok"
              right={() => <Text>{pembelian.kodePemasok}</Text>}
            />
          </List.Section>
          <Divider />
          <List.Section>
            <List.Subheader>Daftar Item</List.Subheader>
            {daftarItemBeli.map((item, index) => (
              <View key={index}>
                <List.Item
                  title={item.namaBarang}
                  description={item.kodeBarang}
                  right={() => {
                    return (
                      <Text>{ServiceBaseHumanCurrency(item.subtotal)}</Text>
                    );
                  }}
                />
              </View>
            ))}
          </List.Section>
          <Divider />
          <List.Section>
            <List.Subheader>Pembayaran</List.Subheader>
            <List.Item
              title="Total"
              right={() => (
                <Text variant="titleLarge">
                  {ServiceBaseHumanCurrency(pembelian.total)}
                </Text>
              )}
            />
            <List.Item
              title="Dibayar"
              right={() => (
                <Text variant="titleLarge">
                  {ServiceBaseHumanCurrency(pembelian.dibayar)}
                </Text>
              )}
            />
            <List.Item
              title="Kembali"
              right={() => (
                <Text>{ServiceBaseHumanCurrency(pembelian.kembali)}</Text>
              )}
            />
          </List.Section>
        </ScrollView>
      )}
      <WidgetBaseLoader complete={complete} />
    </SafeAreaView>
  );
});

export default ScreenPembelianDetail;
