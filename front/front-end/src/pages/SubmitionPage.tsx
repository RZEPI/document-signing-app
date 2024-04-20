import { useNavigate } from "react-router-dom";

import styles from "../styles/SubmitionPage.module.css";
import PreviewBox from "../components/PreviewBox"

import { sign_file } from "../util/http";
import { useAppSelector } from "../store/hooks";
import { getUserData } from "../store/user-data";
import { getFile } from "../store/file";
import { UserDataType } from "../models/UserDataType";
import FileIcon from "../components/FileIcon";


const SubmitionPage: React.FC = () => {
  const navigation = useNavigate();
  const userData: UserDataType = useAppSelector(getUserData);
  const fileProvided: File | null = useAppSelector(getFile); 
  function handleButtonClick() {
    const formData: FormData = new FormData();
    formData.append("file", fileProvided!, (fileProvided!)?.name);
    
    const signedDocument = sign_file({userData}, formData);
    signedDocument.then((response) => {
      if(response === "Error occured while uploading file.")
        alert("Error occured while uploading file.");
      else
        navigation("/sign/download");
    });

  }


  return (
    <div className={styles["preview-container"]}>
      <PreviewBox header="Provided User data">
        <p>Name: {userData.name}</p>
        <p>Index: {userData.index}</p>
        <p>Group: {userData.group}</p>
      </PreviewBox>
      <PreviewBox header="File for signing">
        <FileIcon file_name={fileProvided ? fileProvided.name : ""}/>
      </PreviewBox>
      <button className={styles["sign-button"]} onClick={handleButtonClick}>Sign</button>
    </div>
  );
};

export default SubmitionPage;
