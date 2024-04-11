import { useState } from "react";

import styles from "../styles/UserForm.module.css";
import UserForm from "./UserForm";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getUserData, setUserData } from "../store/user-data";
import { setNextStage } from "../store/stage";
import { UserDataError } from "../models/UserDataError";
import { UserDataType } from "../models/UserDataType";
import Input from "./form inputs/Input";
import Select from "./form inputs/Select";

const UserData: React.FC = () => {
  var dispatch = useAppDispatch();
  var userData = useAppSelector(getUserData);
  const [errors, setErrors] = useState<UserDataError>(new UserDataError());
  const [userDataInputs, setUserDataInputs] = useState<UserDataType>(userData);
  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    var form: FormData = new FormData(e.currentTarget);
    var name:string | undefined = form.get("name")?.toString();
    if(name && name.trim() !== "")
      setUserDataInputs({...userDataInputs, name: name ?? ''});
    else
      setErrors({...errors, name: "Name is required"});

    var index: number | null = form.get("index") as number | null;
    if(index && !(index < 99999 || index > 999999))
      setUserDataInputs({...userDataInputs, index: index ?? 0});
    else
      setErrors({...errors, index: "Index out of range"});

    var group:number | null = form.get("group") as number | null;
    if( group && !(group < 1 || group > 5))
      setUserDataInputs({...userDataInputs, group: group ?? 1});
    else
      setErrors({...errors, group: "Group out of range"});

    if(errors.name === "" && errors.index === "" && errors.group === "")
    {
      dispatch(setUserData({name: name ?? '', index: index ?? 0, group: group ?? 1}));
      dispatch(setNextStage());
    }else
      return;
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    var name: string = e.target.name;
    var value: string | number = e.target.value;

    setUserDataInputs({...userDataInputs, [name]: value});
    setErrors({...errors, [name]: ""});
  }

  return (
    <div className={styles["form-container"]}>
      <UserForm formTitle={"Your data"} buttonCaption={"Save"} onSubmit={submitHandler} >
        <Input label="Name" type="text" name="name" onChange={changeHandler} value={userDataInputs.name} error={errors.name}/>
        <Input label="Index" type="number" name="index" onChange={changeHandler} value={userDataInputs.index} error={errors.index}/>
        <div className={styles["group-select"]}>
          <Select label="Group" name="group" value={userDataInputs.group} error={errors.group} options={[1,2,3,4,5]}/>
        </div>
      </UserForm>
    </div>
  );
};

export default UserData;
