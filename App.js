import "react-native-gesture-handler";
import { LogBox } from "react-native";
import WidgetBaseDrawer from "./src/widgets/base/WidgetBaseDrawer";
import ScreenTesterPrint from "./src/screens/tester/ScreenTesterPrint";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function App() {
  return <WidgetBaseDrawer />;
}

// export default function App() {
//   return <ScreenTesterPrint />;
// }

