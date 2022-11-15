import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SignIn } from "../screens/SignIn";
const { Navigator, Screen } = createBottomTabNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Screen name="sign-in" component={SignIn} />
    </Navigator>
  );
}
