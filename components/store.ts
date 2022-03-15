import create from "zustand";
import { devtools } from "zustand/middleware";

type roleType = "user" | "admin";

type useStoreTypes = {
  isAuthenticated: boolean;
  role: roleType;
  accessToken: null | string;

  changeRole: (type: roleType) => void;
  setAccessToken: (val: string | null) => void;
  // setIsAuthenticated: (val: boolean) => void;
};

const useStore = create<useStoreTypes>(
  devtools(
    (set): useStoreTypes => ({
      isAuthenticated: false,
      role: "user",
      accessToken: null,

      changeRole(type) {
        set(() => ({ role: type }));
      },

      setAccessToken(val) {
        set(() => ({ accessToken: val, isAuthenticated: val ? true : false }));
      },

      // setIsAuthenticated(val) {
      //   set(() => ({ isAuthenticated: val }));
      // },
    }),
    { name: "authStore" }
  )
);

export default useStore;
