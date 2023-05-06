import ServiceBaseRandomID from "../services/ServiceBase";

export default {
  faktur: ServiceBaseRandomID("BELI"),
  tanggal: new Date(),
  total: 0,
  dibayar: 0,
  kembali: 0,
};
