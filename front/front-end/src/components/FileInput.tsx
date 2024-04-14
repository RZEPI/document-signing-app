import {useState} from "react";

import FileIcon from "./FileIcon";
import styles from "../styles/FileInput.module.css";
import { useAppDispatch } from "../store/hooks";
import { setNextStage } from "../store/stage";
import { setFile as setFileToStore } from "../store/file";

const FileInput: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();  

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const files: FileList | null = e.target?.files;
    if(files && files.length > 0)
      setFile(files[0]);
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(file)
    {
        dispatch(setFileToStore(file));
        dispatch(setNextStage())
    }
  }
  var form_status:string = styles["input-form"];
  if(file)
    form_status = form_status.concat(" ", styles["input-form__file-chosen"]);

  return (
    <>
    <h1>Upload the file for signing</h1>
    <div className={styles["file-input-container"]}>
      <form className={form_status} onSubmit={submitHandler}>
        <input
          type="file"
          id="file"
          name="file"
          className={styles["input-file"]}
          onChange={changeHandler}
        />
        <label htmlFor="file">Upload file</label>
        {file && <div className={styles["file-preview"]}>
        <FileIcon file_name={file.name} />
      </div>}
        {file && <button type="submit" className={styles["submit-button"]}>Submit</button>}
      </form>

    </div>
    </>
  );
};

export default FileInput;
