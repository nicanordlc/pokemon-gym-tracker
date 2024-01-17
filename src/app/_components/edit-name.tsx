import clsx from "clsx";
import { type ChangeEvent, useState, type FormEvent } from "react";
import { FaCheckSquare, FaTimesCircle } from "react-icons/fa";

export function EditName(props: {
  name: string;
  defaultName?: string;
  onSubmit?: (name: string) => void;
  onCancel?: () => void;
  onChange?: () => void;
  disable?: boolean;
  className?: string;
  inputClassName?: string;
}) {
  const computedName = props.name ?? props.defaultName;
  const [inputValue, setInputValue] = useState(computedName);

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    props.onChange?.();
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit?.(inputValue || (props.defaultName ?? ""));
  };

  return (
    <form
      className={clsx(props.className, "flex w-full items-center gap-2")}
      onSubmit={submit}
    >
      <button disabled={props.disable} type="submit">
        <FaCheckSquare className="size-c-icon" />
      </button>
      <button disabled={props.disable} onClick={props.onCancel}>
        <FaTimesCircle className="size-c-icon" />
      </button>
      <input
        autoFocus
        className={clsx(
          "w-full",
          "box-content rounded-md px-1 text-black",
          props.inputClassName,
        )}
        disabled={props.disable}
        type="text"
        placeholder={computedName}
        onChange={change}
        value={inputValue}
      />
    </form>
  );
}
