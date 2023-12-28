import classNames from "classnames";
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
    <form className="flex items-center gap-2" onSubmit={submit}>
      <button disabled={props.disable} type="submit">
        <FaCheckSquare />
      </button>
      <button disabled={props.disable} onClick={props.onCancel}>
        <FaTimesCircle />
      </button>
      <input
        className={classNames(
          "box-content rounded-md px-1 text-black",
          props.className,
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
