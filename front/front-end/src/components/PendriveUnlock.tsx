import { useState } from "react";

import UserForm from "./UserForm";
import { verify_pin } from "../util/http";
import { useAppDispatch } from "../store/hooks";
import { setNextStage } from "../store/stage";
import Input from "./form inputs/Input";

const PendriveUnlock: React.FC = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const pin:number = e.currentTarget.pin.value;
    const response: boolean = await verify_pin(pin);

    if (response) {
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
