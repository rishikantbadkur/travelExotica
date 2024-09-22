import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { getMe } from "../../features/apiFearures/userApiFeatures";

export const UserContext = createContext();

const INITIAL_STATE = {
  user: [],
  authenticated: false,
};

export function UserProvider({ children }) {
  const [userState, setUserState] = useState(INITIAL_STATE);

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!isError && userData && userData?.data?.length !== 0) {
        setUserState({ user: userData.data, authenticated: true });
      } else {
        setUserState({ user: [], authenticated: false });
      }
    }
  }, [userData, isError, isLoading]);

  return (
    <UserContext.Provider
      value={{
        userState,
        setUserState,
        isLoading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
