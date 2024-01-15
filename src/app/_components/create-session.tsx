"use client";

import { useRouter } from "next/navigation";
import { type FormEvent } from "react";
import { generate } from "silly-animal";
import { useTrainer } from "~/app/_hooks/trainer";

import { api } from "~/trpc/react";

export function CreateSession() {
  const router = useRouter();
  const { setTrainer } = useTrainer();

  const createSession = api.session.createWithTrainer.useMutation({
    onSuccess: ({ session, trainer }) => {
      setTrainer({ trainer });
      router.push(`/${session.path}`);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createSession.mutate({ name: generate(), isLeader: true });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold "
        disabled={createSession.isLoading}
      >
        {createSession.isLoading ? "Creating Session..." : "Start Session"}
      </button>
    </form>
  );
}
