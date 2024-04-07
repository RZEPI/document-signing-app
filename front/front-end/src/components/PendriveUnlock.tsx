import { useState } from "react";

import UserForm from "./UserForm";
import { useAppDispatch } from "../store/hooks";
import { setNextStage } from "../store/stage";
import Input from "./form inputs/Input";

const PendriveUnlock: React.FC = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();
  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (e.currentTarget.pin.value === "1234") {
      dispatch(setNextStage());
    } else {
      setError("Invalid PIN");
    }
  }

  return (
    <>
      <UserForm
        formTitle={"PIN"}
        buttonCaption="Unlock"
        onSubmit={submitHandler}
      >
        <Input
          label="PIN"
          type="number"
          name="pin"
          onChange={() => {}}
          value={undefined}
          error={error}
        />
      </UserForm>
    </>
  );
};

export default PendriveUnlock;
