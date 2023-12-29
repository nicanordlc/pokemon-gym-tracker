import { useEffect, useState } from "react";
import { useAppStore } from "~/app/_store/app";

export function useApp() {
  const [mounted, setMounted] = useState(false);

  const app = useAppStore(({ app }) => app);

  const setSession = useAppStore(({ setSession }) => setSession);

  useEffect(() => {
    async function rehydrate() {
      await useAppStore.persist.rehydrate();
    }

    rehydrate().catch((e) => {
      console.error(e);
    });

    setMounted(true);
  }, []);

  return { app, setSession, mounted };
}
