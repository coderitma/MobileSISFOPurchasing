import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  ServicePembelianDetail,
  ServicePembelianPrint,
} from "../../services/ServicePembelian";
import { Alert, Text, View } from "react-native";
import { Appbar, Divider, List } from "react-native-paper";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";
import WidgetBaseGroup from "../../widgets/base/WidgetBaseGroup";
import SchemaPembelian from "../../schema/SchemaPembelian";
import {
  ServiceBaseFileSharing,
  ServiceBaseHumanCurrency,
  ServiceBaseHumanDate,
} from "../../services/ServiceBase";

const ScreenPembelianDetail = memo(({ navigation, route }) => {
  const [complete, setComplete] = useState(false);
  const [pembelian, setPembelian] = useState(SchemaPembelian);
  const [daftarItemBeli, setDaftarItemBeli] = useState([]);

  useEffect(() => {
    setComplete(false);
    ServicePembelianDetail(route.params.faktur)
      .then(({ pembelian, items }) => {
        setPembelian(pembelian);
        setDaftarItemBeli(items);
      })
      .catch(() => {})
      .finally(() => setComplete(true));
  }, []);

  const handleServicePembelianShare = () => {
    const actions = [
      {
        text: "Ya",
        onPress: () => {
          ServicePembelianPrint(pembelian.faktur)
            .then(async (blob) => {
              try {
                await ServiceBaseFileSharing("FAKTUR", blob);
                navigation.goBack();
              } catch (error) {
                console.log(error);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
      },
      {
        text: "Kembali",
        onPress: () => navigation.goBack(),
        style: "cancel",
      },
    ];

    Alert.alert("Cetak Faktur?", null, actions);
  };

  if (complete) {
    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Detail Pembelian" />
          <Appbar.Action
            icon="share-variant-outline"
            onPress={() => handleServicePembelianShare()}
          />
        </Appbar.Header>
        <List.Section>
          <List.Subheader>Pembelian</List.Subheader>
          <List.Item title={pembelian.faktur} />
          <Divider />
          <List.Item title={ServiceBaseHumanDate(pembelian.tanggal)} />
          <Divider />
          <List.Item title={pembelian.kodePemasok} />
          <Divider />
        </List.Section>
        <List.Section>
          <List.Subheader>Daftar Item</List.Subheader>
          {daftarItemBeli.map((item, index) => (
            <View key={index}>
              <List.Item
                title={item.namaBarang}
                right={() => {
                  return <Text>{ServiceBaseHumanCurrency(item.subtotal)}</Text>;
                }}
              />
              <Divider />
            </View>
          ))}
        </List.Section>
        <List.Section>
          <List.Subheader>Pembayaran</List.Subheader>
          <List.Item
            title="Total"
            right={() => (
              <Text>{ServiceBaseHumanCurrency(pembelian.total)}</Text>
            )}
          />
          <Divider />
          <List.Item
            title="Dibayar"
            right={() => (
              <Text>{ServiceBaseHumanCurrency(pembelian.dibayar)}</Text>
            )}
          />
          <Divider />
          <List.Item
            title="Kembali"
            right={() => (
              <Text>{ServiceBaseHumanCurrency(pembelian.kembali)}</Text>
            )}
          />
          <Divider />
        </List.Section>
        {/* <WidgetBaseContainer></WidgetBaseContainer> */}
      </>
    );
  } else {
    return <WidgetBaseLoader complete={false} />;
  }
});

export default ScreenPembelianDetail;
