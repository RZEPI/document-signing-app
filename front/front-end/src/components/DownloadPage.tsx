import {useState} from "react";
import { download_files } from "../util/http";

import styles from "../styles/DownloadPage.module.css";
import PreviewBox from "./PreviewBox";

const DownloadPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [files, setFiles] = useState<Blob[] | null>(null);

    function downloadFile(){
        setIsLoading(true);
        download_files().then((response) => {
            setFiles(response);
        });
        setIsLoading(false);
    }
  return (
    <div className={styles["main-container"]}>
      <PreviewBox header="Download signed file">
        {isLoading && <p>Loading...</p>}
        {files && <>
            <a href={URL.createObjectURL(files[0])} download="signed.pdf">Signed document</a>
            <a href={URL.createObjectURL(files[1])} download="document.xml">XML file</a>
        </>}
        {!files && <button onClick={downloadFile} className={styles["download-button"]}>Download</button>}
      </PreviewBox>
    </div>
  );
};

export default DownloadPage;