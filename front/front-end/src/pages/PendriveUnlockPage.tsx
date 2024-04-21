import UserForm from "../components/UserForm";
import Input from "../components/form inputs/Input";
import {
  useNavigation,
  useActionData,
  ActionFunction,
  json,
  redirect,
} from "react-router-dom";

const PendriveUnlockPage: React.FC = () => {
  const actionData = useActionData() as { message: string} | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <UserForm
        formTitle={"PIN"}
        buttonCaption="Unlock"
        buttonBlocked={isSubmitting}
      >
        <Input
          label="PIN"
          type="number"
          name="pin"
          onChange={() => {}}
          value={undefined}
          error={actionData ? actionData?.message : ""}
        />
      </UserForm>
    </>
  );
};

export default PendriveUnlockPage;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const pin = formData.get("pin");

  const response = await fetch("http://localhost:5000/pin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pin }),
  });
  if (response.status === 401) {
    return await response.json();
  }

  return redirect("/sign/data");
};
