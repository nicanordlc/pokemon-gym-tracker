import { Badges } from "~/app/_components/badges";
import { Title } from "~/app/_components/title";
import { generate } from "silly-animal";

export default async function Home() {
  const randomName = generate();

  return (
    <div className="grid gap-4">
      <Title />

      <Badges init />

      {/* @TODO: get user props from state */}
      <Badges
        username={randomName}
        red={[1]}
        emerald={[1]}
        crystal={[2, 3, 1]}
      />
    </div>
  );
}
