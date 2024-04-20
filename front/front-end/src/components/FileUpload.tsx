import { useState } from "react";
import { LabeledFile } from "../models/LabeledFile";

import styles from "../styles/FileUpload.module.css";

import FileInput from "./form inputs/FileInput";
import FileIcon from "./FileIcon";

const FileUpload: React.FC<{
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  fields: string[];
  header: string;
}> = ({ onSubmit, fields, header }) => {
  const fieldCount: number = fields.length;

  const [files, setFiles] = useState<LabeledFile[] | null>(null);
  var form_status: string = styles["input-form"];
  if (files && files?.length >= fieldCount)
    form_status = form_status.concat(" ", styles["input-form__file-chosen"]);

  return (
    <>
      <h1>{header}</h1>
      <div className={styles["file-input-container"]}>
        <form className={form_status} onSubmit={onSubmit}>
          {fields.map((field) => {
            return (
              <div className={styles["form-row"]}>
                <FileInput setFile={setFiles} label={field} key={field} />
                {files && files.find((file) => file.label === field) && (
                  <div className={styles["file-preview"]}>
                    <FileIcon file_name={files.find((file) => file.label === field)?.file.name!} />
                  </div>
                )}
              </div>
            );
          })}
          {files && files?.length === fieldCount && (
            <button type="submit" className={styles["submit-button"]}>
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default FileUpload;