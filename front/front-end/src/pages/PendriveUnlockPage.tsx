import { useState } from "react";
import UserForm from "../components/UserForm";
import { verify_pin } from "../util/http";
import Input from "../components/form inputs/Input";
import { useNavigate } from "react-router-dom";

const PendriveUnlockPage: React.FC = () => {
  const [error, setError] = useState<string>("");
  const navigation = useNavigate();
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const pin:number = e.currentTarget.pin.value;
    const response: boolean = await verify_pin(pin);

    if (response) {
      navigation("/sign/data");
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

export default PendriveUnlockPage;
