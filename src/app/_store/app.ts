import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AppStore {
  app: {
    sessionId: string;
  }
}

interface AppActions {
  setSession: (props: { id: string }) => void;
}

export const useAppStore = create<AppStore & AppActions>()(
  immer(
    devtools(
      persist(
        (set) => ({
          app: {
            sessionId: ''
          },

          setSession: ({ id }) => set((state) => { state.app.sessionId = id }),
        }),

        { name: "appStore" },
      ),
    ),
  ),
);
