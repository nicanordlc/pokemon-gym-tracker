import { useState } from "react";
import { FaCheckSquare, FaTimesCircle } from "react-icons/fa";

export function EditName(props: {
  name: string;
  onSubmit?: () => void;
  onCancel?: () => void;
}) {
  const [inputValue, setInputValue] = useState(props.name);

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit && props.onSubmit();
      }}
    >
      <button type="submit">
        <FaCheckSquare />
      </button>
      <button onClick={props.onCancel}>
        <FaTimesCircle />
      </button>
      <input
        className="box-content rounded-md px-1 text-black"
        type="text"
        placeholder={props.name}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
    </form>
  );
}
