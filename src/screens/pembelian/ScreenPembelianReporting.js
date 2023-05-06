import { memo, useEffect, useState } from "react";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import { Appbar, Button, TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  ServiceBaseDateToISO,
  ServiceBaseFileSharing,
  ServiceBaseHumanDate,
} from "../../services/ServiceBase";
import { ServicePembelianReport } from "../../services/ServicePembelian";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const ScreenPembelianReporting = memo(({ navigation }) => {
  const [complete, setComplete] = useState(false);
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [reportPayload, setReportPayload] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    setComplete(false);
    setTimeout(() => setComplete(true), 1000);
  }, []);

  const send = () => {
    payload = {
      startDate: ServiceBaseDateToISO(reportPayload.startDate),
      endDate: ServiceBaseDateToISO(reportPayload.endDate),
    };

    setComplete(false);
    ServicePembelianReport(payload)
      .then(async (blob) => {
        try {
          ServiceBaseFileSharing("LAPORAN-PEMBELIAN", blob);
        } catch (error) {
          console.log(error);
        } finally {
          setComplete(true);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setComplete(true));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Laporan Pembelian" />
      </Appbar.Header>
      {complete && (
        <ScrollView
          contentContainerStyle={{
            gap: 16,
            marginVertical: 24,
            marginHorizontal: 24,
          }}>
          <TextInput
            label="Tanggal Awal"
            mode="outlined"
            editable={false}
            right={
              <TextInput.Icon
                icon="calendar"
                onPress={() => setOpenStartDate(true)}
              />
            }
            value={`${ServiceBaseHumanDate(reportPayload.startDate)}`}
          />
          <TextInput
            label="Tanggal Akhir"
            mode="outlined"
            right={
              <TextInput.Icon
                icon="calendar"
                onPress={() => setOpenEndDate(true)}
              />
            }
            value={`${ServiceBaseHumanDate(reportPayload.endDate)}`}
          />

          <Button mode="contained" onPress={send}>
            Kirim
          </Button>

          {openStartDate && (
            <DateTimePicker
              value={new Date()}
              mode={"date"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={true}
              onChange={(event, value) => {
                setOpenStartDate(false);
                setReportPayload((values) => ({ ...values, startDate: value }));
              }}
            />
          )}
          {openEndDate && (
            <DateTimePicker
              value={new Date()}
              mode={"date"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={true}
              onChange={(event, value) => {
                setOpenEndDate(false);
                setReportPayload((values) => ({ ...values, endDate: value }));
              }}
            />
          )}
        </ScrollView>
      )}
      <WidgetBaseLoader complete={complete} />
    </SafeAreaView>
  );
});

export default ScreenPembelianReporting;
