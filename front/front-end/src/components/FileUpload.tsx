import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { LabeledFile } from "../models/LabeledFile";

import styles from "../styles/FileUpload.module.css";

import FileInput from "./form inputs/FileInput";
import FileIcon from "./FileIcon";

const FileUpload: React.FC<{
  fields: string[];
  header: string;
}> = ({ fields, header }) => {
  const fieldCount: number = fields.length;

  const [files, setFiles] = useState<LabeledFile[] | null>(null);
  var form_status: string = styles["input-form"];
  if (files && files?.length >= fieldCount)
    form_status = form_status.concat(" ", styles["input-form__file-chosen"]);

  useEffect(() => {
    setFiles(null);
  }, [fields, header]);

  return (
    <>
      <h1>{header}</h1>
      <div className={styles["file-input-container"]}>
        <Form
          className={form_status}
          method="post"
          encType="multipart/form-data"
        >
          {fields.map((field, fieldIndex) => {
            return (
              <div className={styles["form-row"]} key={fieldIndex}>
                <FileInput setFile={setFiles} label={field} key={field} />
                {files && files.find((file) => file.label === field) && (
                  <div className={styles["file-preview"]}>
                    <FileIcon
                      fileName={
                        files.find((file) => file.label === field)?.file.name!
                      }
                    />
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
        </Form>
      </div>
    </>
  );
};

export default FileUpload;
