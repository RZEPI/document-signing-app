import styles from "../../styles/FileInput.module.css";
import { LabeledFile } from "../../models/LabeledFile";

const FileInput: React.FC<{
  setFile: React.Dispatch<React.SetStateAction<LabeledFile[] | null>>;
  label: string;
}> = ({ setFile, label }) => {
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files: FileList | null = event.target?.files;
    if (files && files.length > 0)
      setFile((prevFiles) => {
        const insertedFile: LabeledFile = { label, file: files[0] };
        if (!prevFiles) return [insertedFile];
        if(prevFiles.find((file) => file.label === label))
          return [...prevFiles.filter((file) => file.label !== label), insertedFile]
        return [...prevFiles, insertedFile];
      });
  }

  return (
    <>
      <h2 className={styles["file-input-header"]}>{`${label}:`}</h2>
      <input
        type="file"
        id={label}
        name={label}
        className={styles["input-file"]}
        onChange={handleFileChange}
      />
      <label htmlFor={label}>Upload file</label>
    </>
  );
};

export default FileInput;
