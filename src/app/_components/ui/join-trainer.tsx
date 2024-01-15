import clsx from "clsx";
import { useRef, useState } from "react";
import { generate } from "silly-animal";
import { EditName } from "~/app/_components/edit-name";
import { useApp } from "~/app/_hooks/app";
import { useTrainer } from "~/app/_hooks/trainer";
import { api } from "~/trpc/react";
import { getTrainer } from "~/utils/get-trainer";

export function JoinTrainer(props: {
  sessionId: string;
  className?: string;
  inputClassName?: string;
}) {
  const { app } = useApp();
  const { trainers } = useTrainer();
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState(false);
  const { setTrainer } = useTrainer();

  const localTrainer = getTrainer({
    trainers,
    sessionPath: app.sessionId,
  });
  const randomName = useRef(generate());

  const generateNew = () => (randomName.current = generate());

  const joinTrainer = api.trainer.create.useMutation({
    onSuccess: (trainer) => {
      setTrainer({ trainer });
      toggleJoining();
      generateNew();
      setError(false);
    },
    onError: () => {
      setError(true);
    },
  });

  const toggleJoining = () => setJoining((state) => !state);

  const success = (name: string) => {
    joinTrainer.mutate({
      name,
      sessionPath: props.sessionId,
      isLeader: localTrainer.sessionLeader,
    });
  };

  const cancel = () => toggleJoining();

  return joining ? (
    <EditName
      className={props.className}
      inputClassName={clsx(
        props.inputClassName,
        error ? "border-2 border-red-600" : "",
      )}
      disable={joinTrainer.isLoading}
      name={randomName.current}
      defaultName={randomName.current}
      onCancel={cancel}
      onSubmit={success}
      onChange={() => setError(false)}
    />
  ) : (
    <button
      className={clsx(props.className, "rounded-md bg-slate-400 p-2")}
      onClick={toggleJoining}
    >
      Join
    </button>
  );
}
