import { useState } from "react";
import { EditName } from "~/app/_components/edit-name";
import { ShowName } from "~/app/_components/show-name";

export default function EditTrainername(props: {
  trainername: string;
  editable?: boolean;
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

  return (
    <div className="flex items-center gap-1">
      {editting ? (
        <EditName
          name={props.trainername}
          onSubmit={success}
          onCancel={cancel}
        />
      ) : (
        <ShowName
          editable={props.editable}
          name={props.trainername}
          onClick={toggleEdit}
        />
      )}
    </div>
  );
}
