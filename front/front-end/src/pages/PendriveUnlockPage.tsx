import {useState} from "react";
import UserForm from "../components/UserForm";
import Input from "../components/form inputs/Input";
import {
  useNavigation,
  useActionData,
  ActionFunction,
  redirect,
} from "react-router-dom";
import { send_json } from "../util/http";


const PendriveUnlockPage: React.FC = () => {
  const [error, setError] = useState<string>("");
  const actionData = useActionData() as { message: string} | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>){
    const onlyNumbers =  /^\d+$/.test(event.target.value);
    if(event.target.value.length === 0 ){
      setError("");
      return
    }
    if(event.target.value.length > 4){
      setError("PIN must have 4 digits");
      return;
    }
    if(!onlyNumbers){
      setError("PIN must contain only digits");
      return;
    }
    setError("");
  }

  return (
    <>
      <UserForm
        formTitle={"PIN"}
        buttonCaption="Unlock"
        buttonBlocked={isSubmitting && !error}
      >
        <Input
          label="PIN"
          type="password"
          name="pin"
          onChange={changeHandler}
          value={undefined}
          error={actionData ? actionData?.message : error}
        />
      </UserForm>
    </>
  );
};

export default PendriveUnlockPage;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const pin = formData.get("pin") as string;
  const pin_number = parseInt(pin);

  const response = await send_json("http://localhost:5000/pin", pin_number);
  if (response.status !== 200) {
    return await response.data;
  }

  return redirect("/sign/data");
};
