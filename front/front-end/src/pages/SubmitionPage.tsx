import {
  ActionFunction,
  redirect,
  useSubmit,
  useNavigation,
  Link,
} from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import styles from "../styles/SubmitionPage.module.css";
import PreviewBox from "../components/PreviewBox";

import store from "../store/";
import { useAppSelector } from "../store/hooks";
import { getUserData } from "../store/user-data";
import { getFile } from "../store/file";
import { UserDataType } from "../models/UserDataType";
import FileIcon from "../components/FileIcon";

const SubmitionPage: React.FC = () => {
  const isSending = useNavigation().state === "submitting";
  const submit = useSubmit();
  const userData: UserDataType = useAppSelector(getUserData);
  const fileProvided: File | null = useAppSelector(getFile);
  function handleButtonClick() {
    submit(null, { method: "POST" });
  }

  return (
    <div className={styles["preview-container"]}>
      <PreviewBox header="Provided User data" link="/sign/data">
        <p>Name: {userData.name}</p>
        <p>Index: {userData.index}</p>
        <p>Group: {userData.group}</p>
      </PreviewBox>
      <PreviewBox header="File for signing" link="/sign/file">
        <FileIcon fileName={fileProvided ? fileProvided.name : ""} />
      </PreviewBox>
      <button
        className={styles["sign-button"]}
        onClick={handleButtonClick}
        disabled={isSending}
      >
        {isSending ? "Sending..." : "Sign"}
      </button>
    </div>
  );
};

export default SubmitionPage;

export const action: ActionFunction = async () => {
  const formData = new FormData();
  const file = store.getState().file; //workaround because useSubmit doesn't send formdata properly
  const userData = store.getState().userData;

  formData.append("file", file.file!, file.file!.name);
  formData.append("userData", JSON.stringify(userData));
  const response: AxiosResponse = await axios.post(
    "http://localhost:5000/sign",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (response.status === 200) return redirect("/sign/download");
  else return response;
};
