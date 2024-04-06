import styles from "../styles/FileInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

const FileInput: React.FC = () => {
  return (
    <>
    <h1>Upload the file for signing</h1>
    <div className={styles["file-input-container"]}>
      <form className={styles["input-form"]}>
        <input
          type="file"
          id="file"
          name="file"
          className={styles["input-file"]}
        />
        <label htmlFor="file">Upload file</label>
      </form>
      <div className={styles["file-preview"]}>
        <FontAwesomeIcon icon={faFile} />
        <span>File name</span>
      </div>
    </div>
    </>
  );
};

export default FileInput;
