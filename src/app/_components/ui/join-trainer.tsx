import classNames from "classnames";
import { useRef, useState } from "react";
import { generate } from "silly-animal";
import { EditName } from "~/app/_components/edit-name";
import { useTrainer } from "~/app/_hooks/trainer";
import { api } from "~/trpc/react";

export function JoinTrainer(props: {
  sessionId: string;
  className?: string;
  inputClassName?: string;
}) {
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState(false);
  const { setTrainer } = useTrainer();
  const randomName = useRef(generate());

  const generateNew = () => (randomName.current = generate());

  const joinTrainer = api.trainer.create.useMutation({
    onSuccess: (trainer) => {
      setTrainer(trainer);
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
    joinTrainer.mutate({ name, sessionId: props.sessionId });
  };

  const cancel = () => toggleJoining();

  return joining ? (
    <EditName
      className={props.className}
      inputClassName={classNames(
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
      className={classNames(props.className, "rounded-md bg-slate-400 p-2")}
      onClick={toggleJoining}
    >
      Join
    </button>
  );
}
