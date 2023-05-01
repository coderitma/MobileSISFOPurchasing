import "react-native-gesture-handler";
import { LogBox } from "react-native";
import WidgetBaseDrawer from "./src/widgets/base/WidgetBaseDrawer";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function App() {
  return <WidgetBaseDrawer />;
}

