"use client";

import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";

export function CreateSession() {
  const router = useRouter();

  const createSession = api.post.create.useMutation({
    onSuccess: () => {
      // @TODO: redirect to the new session Page
      router.refresh();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/a");
      }}
      className="flex flex-col gap-2"
    >
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold "
        disabled={createSession.isLoading}
      >
        {createSession.isLoading ? "Preparing Session..." : "Start Session"}
      </button>
    </form>
  );
}
