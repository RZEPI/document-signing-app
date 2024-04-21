import { useState,useEffect } from "react";
import { ActionFunction, useNavigate, useNavigation, useActionData, redirect } from "react-router-dom";

import styles from "../styles/UserForm.module.css";
import UserForm from "../components/UserForm";
import { useAppSelector } from "../store/hooks";
import store from "../store";
import { getUserData, setUserData } from "../store/user-data";
import { UserDataError } from "../models/UserDataError";
import { UserDataType } from "../models/UserDataType";
import { UserData as UserDataClass } from "../models/UserData";
import Input from "../components/form inputs/Input";
import Select from "../components/form inputs/Select";

const UserDataPage: React.FC = () => {
  var actionData = useActionData() as UserDataError | undefined;
  const isSubmitting = useNavigation().state === "submitting";
  const userData = useAppSelector(getUserData);
  const [errors, setErrors] = useState<UserDataError>(actionData ?? new UserDataError());
  const [userDataInputs, setUserDataInputs] = useState<UserDataType>({...userData});

  useEffect(() => {
    setErrors(actionData ?? new UserDataError());
  }, [actionData, setErrors]);

  function changeHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    var name: string = e.target.name;
    var value: string | number = e.target.value;

    setUserDataInputs({ ...userDataInputs, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  return (
    <div className={styles["form-container"]}>
      <UserForm formTitle={"Your data"} buttonCaption={"Save"} buttonBlocked={isSubmitting}>
        <Input
          label="Name"
          type="text"
          name="name"
          onChange={changeHandler}
          value={userDataInputs.name}
          error={errors.name}
        />
        <Input
          label="Index"
          type="number"
          name="index"
          onChange={changeHandler}
          value={userDataInputs.index}
          error={errors.index}
        />
        <div className={styles["group-select"]}>
          <Select
            label="Group"
            name="group"
            value={userDataInputs.group}
            error={errors.group}
            options={[1, 2, 3, 4, 5]}
          />
        </div>
      </UserForm>
    </div>
  );
};

export default UserDataPage;

export const action: ActionFunction = async ({ request }) => {
  const form: FormData = await request.formData();
  var name: string | undefined = form.get("name")?.toString();
  const userDataInputs: UserDataClass = new UserDataClass();
  var errors: UserDataError = new UserDataError();
  if (name && name.trim() !== "") userDataInputs.name = name!;
  else errors.name = "Name is required";

  var index: number | null = form.get("index") as number | null;
  if (index && !(index < 99999 || index > 999999))
   userDataInputs.index = index!;
  else errors.index = "Index out of range";

  var group: number | null = form.get("group") as number | null;
  if (group && !(group < 1 || group > 5))
    userDataInputs.group = group!;
  else errors.group = "Group out of range";

  if (errors.name === "" && errors.index === "" && errors.group === "") {
    store.dispatch(
      setUserData({...userDataInputs})
    );
    return redirect("/sign/file");
  } else return errors;
};
