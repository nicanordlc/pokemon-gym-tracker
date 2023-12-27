import { useEffect, useState } from "react";
import { useTrainerStore } from "~/app/_store/trainer";

export function useTrainer() {
  const [trainerMounted, setTrainerMounted] = useState(false);

  const trainer = useTrainerStore((state) => state.trainer);
  const setTrainer = useTrainerStore((state) => state.setTrainer);

  useEffect(() => {
    setTrainerMounted(true);
  }, []);

  return { trainer, setTrainer, trainerMounted };
}
