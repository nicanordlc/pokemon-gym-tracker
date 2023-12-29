import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AppStore {
  sessionId: string;
}

interface AppActions {
  setSession: (props: { id: string }) => void;
}

export const useAppStore = create<AppStore & AppActions>()(
  immer(
    devtools(
      persist(
        (set) => ({
          sessionId: '',

          setSession: ({ id }) => set((state) => { state.sessionId = id }),
        }),

        { name: "appStore", skipHydration: true },
      ),
    ),
  ),
);
