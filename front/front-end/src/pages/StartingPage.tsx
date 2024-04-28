import styles from "../styles/StartingPage.module.css";
import LinkButton from "../components/LinkButton";

const StartingPage: React.FC = () => {
  return (
    <>
      <h1 style={{textAlign: "center"}}>Choose your action</h1>
      <div className={styles["action-contaiener"]}>
        <LinkButton to="/sign/pin">Sign document</LinkButton>
        <LinkButton to="/verify">Verify document</LinkButton>
        <LinkButton to="/crypt-op/Encryption">Encrypt/Decrypt <br/> document</LinkButton>
      </div>
    </>
  );
};

export default StartingPage;
