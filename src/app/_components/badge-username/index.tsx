import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { EditName } from "~/app/_components/badge-username/edit-name";

export default function BadgeUsername(props: {
  username: string;
  edit?: boolean;
}) {
  const [editting, setEditting] = useState(false);

  const toggleEdit = () => setEditting((state) => !state);

  function ShowName() {
    return (
      <>
        {props.edit && (
          <button onClick={toggleEdit}>
            <FaEdit />
          </button>
        )}
        <p>{props.username}</p>
      </>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {editting ? (
        <EditName
          name={props.username}
          onSubmit={toggleEdit}
          onCancel={toggleEdit}
        />
      ) : (
        <ShowName />
      )}
    </div>
  );
}
