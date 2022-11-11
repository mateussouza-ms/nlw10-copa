import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FindPool } from "../screens/FindPool";
import { NewPool } from "../screens/NewPool";
import { Pools } from "../screens/Pools";
const { Navigator, Screen } = createBottomTabNavigator();

export function AuthRoutes() {
  return (
    <Navigator>
      <Screen name="new-pool" component={NewPool} />
      <Screen name="pools" component={Pools} />
      <Screen name="find-pool" component={FindPool} />
    </Navigator>
  );
}
