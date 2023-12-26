"use client";

import { Badges } from "~/app/_components/badges";
import { Title } from "~/app/_components/title";
import { generate } from "silly-animal";
import { useEffect, useState } from "react";
import { useUserStore } from "~/app/_store/user";

export default function Home() {
  const [username, setUsername] = useState("");
  const bears = useUserStore((s) => s.bears);
  const inc = useUserStore((s) => s.increase);

  const incByOne = () => inc(1);

  useEffect(() => {
    setUsername(generate());
  }, []);

  return (
    <div className="grid gap-4">
      <Title />

      <div className="flex gap-2">
        <button onClick={incByOne} className="rounded-md bg-slate-500 px-2 ">
          Increase Bear
        </button>
        <p>{bears}</p>
      </div>

      <Badges init />

      {/* @TODO: get user props from state */}
      <Badges username={username} red={[1]} emerald={[1]} crystal={[2, 3, 1]} />
    </div>
  );
}
