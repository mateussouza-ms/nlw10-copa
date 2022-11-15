import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { PlusCircle, SoccerBall } from "phosphor-react-native";
import { Platform } from "react-native";
import { FindPool } from "../screens/FindPool";

import { NewPool } from "../screens/NewPool";
import { Pools } from "../screens/Pools";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();

  const iconsSize = theme.sizes[6];
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.yellow[500],
        tabBarInactiveTintColor: theme.colors.gray[300],
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          position: "absolute",
          height: 67,
          borderTopWidth: 0,
          backgroundColor: theme.colors.gray[800],
        },
        tabBarItemStyle: {
          position: "relative",
          top: Platform.OS === "android" ? -10 : 0,
        },
      }}
    >
      <Screen
        name="new-pool"
        component={NewPool}
        options={{
          tabBarLabel: "Novo bolão",
          tabBarIcon: ({ color }) => (
            <PlusCircle color={color} size={iconsSize} />
          ),
        }}
      />

      <Screen
        name="pools"
        component={Pools}
        options={{
          tabBarLabel: "Meus bolões",
          tabBarIcon: ({ color }) => (
            <SoccerBall color={color} size={iconsSize} />
          ),
        }}
      />

      <Screen
        name="find-pool"
        component={FindPool}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
