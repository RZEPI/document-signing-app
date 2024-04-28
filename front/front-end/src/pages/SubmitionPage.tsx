import {
  ActionFunction,
  redirect,
  useSubmit,
  useNavigation,
} from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import styles from "../styles/SubmitionPage.module.css";
import PreviewBox from "../components/PreviewBox";

import { useAppSelector } from "../store/hooks";
import { getUserData } from "../store/user-data";
import { getFile } from "../store/file";
import { UserDataType } from "../models/UserDataType";
import FileIcon from "../components/FileIcon";
import { send_form } from "../util/http";

const SubmitionPage: React.FC = () => {
  const isSending = useNavigation().state === "submitting";
  const submit = useSubmit();
  const userData: UserDataType = useAppSelector(getUserData);
  const fileProvided: File | null = useAppSelector(getFile);
  const formData = new FormData();
  formData.append("file", fileProvided!, fileProvided!.name);
  formData.append("userData", JSON.stringify(userData));

  function handleButtonClick() {
    submit(formData, { method: "POST", encType: "multipart/form-data"});
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

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();
  const response: AxiosResponse = await send_form("http://localhost:5000/sign", formData);
  if (response.status === 200) return redirect("/sign/download");
  else return response;
};
