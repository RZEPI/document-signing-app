import styles from "../styles/SubmitionPage.module.css";
import PreviewBox from "./PreviewBox"

import { sign_file } from "../util/http";
import { useAppSelector,useAppDispatch } from "../store/hooks";
import { getUserData } from "../store/user-data";
import { setNextStage } from "../store/stage";
import { getFile } from "../store/file";
import { UserDataType } from "../models/UserDataType";
import FileIcon from "./FileIcon";


const SubmitionPage: React.FC = () => {
  const userData: UserDataType = useAppSelector(getUserData);
  const fileProvided: File | null = useAppSelector(getFile); 
  const dispatch = useAppDispatch();
  function handleButtonClick() {
    const formData: FormData = new FormData();
    formData.append("file", fileProvided!, (fileProvided!)?.name);
    
    const signedDocument = sign_file({userData}, formData);
    signedDocument.then((response) => {
      if(response === "Error occured while uploading file.")
        alert("Error occured while uploading file.");
      else
        alert("File signed successfully.");
    });

    dispatch(setNextStage());
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
