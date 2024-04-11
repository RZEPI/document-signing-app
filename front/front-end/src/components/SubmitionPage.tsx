import styles from "../styles/SubmitionPage.module.css";
import PreviewBox from "./PreviewBox"

import { useAppSelector } from "../store/hooks";
import { getUserData } from "../store/user-data";
import { UserDataType } from "../models/UserDataType";
import FileIcon from "./FileIcon";

const SubmitionPage: React.FC = () => {
  const userData: UserDataType = useAppSelector(getUserData);

  return (
    <div className={styles["preview-container"]}>
      <PreviewBox header="Provided User data">
        <p>Name: {userData.name}</p>
        <p>Index: {userData.index}</p>
        <p>Group: {userData.group}</p>
      </PreviewBox>
      <PreviewBox header="File for signing">
        <FileIcon filename="filename"/>
      </PreviewBox>
      <button className={styles["sign-button"]}>Sign</button>
    </div>
  );
};

export default SubmitionPage;
