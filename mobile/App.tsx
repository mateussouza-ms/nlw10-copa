import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { Center, NativeBaseProvider, StatusBar } from "native-base";

import { Loading } from "./src/components/Loading";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { NewPool } from "./src/screens/NewPool";
import { THEME } from "./src/styles/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <Center flex={1} bgColor="gray.900">
          {fontsLoaded ? <NewPool /> : <Loading />}
        </Center>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
