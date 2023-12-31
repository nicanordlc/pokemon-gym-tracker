import { FaEdit } from "react-icons/fa";

export function ShowName(props: {
  name: string;
  editable?: boolean;
  onClick?: () => void;
}) {
  return (
    <>
      {props.editable && (
        <button onClick={props.onClick}>
          <FaEdit className="size-c-icon" />
        </button>
      )}
      <p>{props.name}</p>
    </>
  );
}
