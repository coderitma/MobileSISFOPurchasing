import { memo, useEffect, useState } from "react";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import { Appbar, Button, TextInput } from "react-native-paper";
import WidgetBaseContainer from "../../widgets/base/WidgetBaseContainer";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  ServiceBaseDateToISO,
  ServiceBaseFileSharing,
  ServiceBaseHumanDate,
} from "../../services/ServiceBase";
import { ServicePembelianReport } from "../../services/ServicePembelian";

const ScreenPembelianReporting = memo(({ navigation }) => {
  const [complete, setComplete] = useState(false);
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [reportPayload, setReportPayload] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    setComplete(true);
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
          await ServiceBaseFileSharing("LAPORAN-PEMBELIAN", blob);
        } catch (error) {
          console.log(error);
        } finally {
          setComplete(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setComplete(true);
      });
  };

  if (complete) {
    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Laporan Pembelian" />
        </Appbar.Header>
        <WidgetBaseContainer>
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
        </WidgetBaseContainer>

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
      </>
    );
  } else {
    return <WidgetBaseLoader complete={false} />;
  }
});

export default ScreenPembelianReporting;
