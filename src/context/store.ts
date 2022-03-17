import create from "zustand";
import { devtools } from "zustand/middleware";

type roleType = "user" | "admin";

enum AccessLevel {
  USER = "CODE 234",
  EDITOR = "CODE 134",
  ADMIN = "CODE 34",
}

type useStoreTypes = {
  isAuthenticated: boolean;
  role: roleType;
  accessToken: null | string;
  loading: boolean;

  changeRole: (type: roleType) => void;
  setAccessToken: (val: string | null) => void;
  setLoading: (val: boolean) => void;
};

const useStore = create<useStoreTypes>(
  devtools(
    (set): useStoreTypes => ({
      isAuthenticated: false,
      role: "user",
      accessToken: null,
      loading: false,

      changeRole(type) {
        set(() => ({ role: type }));
      },

      setAccessToken(val) {
        set(() => ({ accessToken: val, isAuthenticated: val ? true : false }));
      },

      setLoading(val) {
        set(() => ({ loading: val }));
      },
    }),
    { name: "authStore" }
  )
);

export default useStore;
