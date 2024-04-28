import styles from "../styles/StartingPage.module.css";
import LinkButton from "../components/LinkButton";
import { useAppSelector } from "../store/hooks";
import { getUserType } from "../store/user-type";
import { UserType } from "../models/UserType";

const StartingPage: React.FC = () => {
  const userType = useAppSelector(getUserType);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Choose your action</h1>
      <div className={styles["action-contaiener"]}>
        {userType == UserType.User_a && <LinkButton to="/sign/pin">Sign document</LinkButton>}
        <LinkButton to="/verify">Verify document</LinkButton>
        <LinkButton to="/crypt-op/Encryption">
          Encrypt/Decrypt <br /> document
        </LinkButton>
      </div>
    </>
  );
};

export default StartingPage;
