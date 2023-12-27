import { Badges } from "~/app/_components/badges";
import { Title } from "~/app/_components/title";
import { useUser } from "~/app/_hooks/use";

export default function Home() {
  const user = useUser();

  return (
    <div className="grid gap-4">
      <Title />

      <Badges init />

      {/* @TODO: get user props from state */}
      <Badges username={user} red={[1]} emerald={[1]} crystal={[2, 3, 1]} />
    </div>
  );
}
