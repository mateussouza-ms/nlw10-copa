import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { createContext, ReactNode, useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

export interface UserProps {
  name: string;
  avatarUrl: string;
}
export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserProps>({
    name: "Mateus Souza",
    avatarUrl: "https://guthub.com/mateeussouza-ms.png",
  });
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "667464238359-nf93ldmin40atkubejeq3jv18hjulkuj.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({
      useProxy: true,
    }),
    scopes: ["profile", "email"],
  });

  async function signIn() {
    try {
      setIsUserLoading(true);

      await promptAsync();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWitGoogle(access_token: string) {
    console.log("access_token", access_token);
  }

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      signInWitGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider value={{ user, isUserLoading, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
