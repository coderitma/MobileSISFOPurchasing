import { useCallback, useEffect, useMemo, useState } from "react";
import { ServiceBaseActivity } from "../services/ServiceBase";

export const useHookBaseRefresh = () => {
  const [isRefresh, setIsRefresh] = useState(false);

  const stopRefresh = () =>
    ServiceBaseActivity(() => {
      setIsRefresh(false);
    }, 100);
  const startRefresh = () =>
    ServiceBaseActivity(() => {
      setIsRefresh(true);
    }, 100);

  return { isRefresh, stopRefresh, startRefresh };
};
