import { type Trainer } from "@prisma/client";

export function getTrainer(props: {
  trainers: Trainer[];
  sessionPath: string;
}) {
  const defaultTrainer: Trainer = {
    id: "",
    badgesCrystal: "",
    badgesEmerald: "",
    badgesRed: "",
    createdAt: new Date(),
    name: "",
    sessionPath: "",
    updatedAt: new Date(),
  };

  return (
    props.trainers.filter(
      ({ sessionPath: _path }) => _path === props.sessionPath,
    )[0] ?? defaultTrainer
  );
}
