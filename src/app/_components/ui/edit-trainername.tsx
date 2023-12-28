import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { EditName } from "~/app/_components/edit-name";

export default function EditTrainername(props: {
  trainername: string;
  edit?: boolean;
  onSuccess?: (name: string) => void;
  onCancel?: () => void;
}) {
  const [editting, setEditting] = useState(false);

  const toggleEdit = () => setEditting((state) => !state);

  const success = (name: string) => {
    props.onSuccess && props.onSuccess(name);
    toggleEdit();
  };

  const cancel = () => {
    props.onCancel && props.onCancel();
    toggleEdit();
  };

  function ShowName() {
    return (
      <>
        {props.edit && (
          <button onClick={toggleEdit}>
            <FaEdit />
          </button>
        )}
        <p>{props.trainername}</p>
      </>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {editting ? (
        <EditName
          name={props.trainername}
          onSubmit={success}
          onCancel={cancel}
        />
      ) : (
        <ShowName />
      )}
    </div>
  );
}
