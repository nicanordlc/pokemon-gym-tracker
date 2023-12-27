"use client";

import { Badges } from "~/app/_components/badges";
import { Title } from "~/app/_components/title";
import { useTrainer } from "~/app/_hooks/trainer";

export default function Session() {
  const { trainer, trainerMounted } = useTrainer();
  const username = trainerMounted ? trainer.name : "";

  return (
    <div className="grid gap-4">
      <Title />

      <Badges init />

      {/* @TODO: modify trainer's badges from db */}
      <Badges username={username} red={[1]} emerald={[1]} crystal={[2, 3, 1]} />
    </div>
  );
}
