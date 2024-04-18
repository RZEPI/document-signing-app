import {useEffect, useState} from "react";
import { download_files } from "../util/http";

import styles from "../styles/DownloadPage.module.css";
import PreviewBox from "./PreviewBox";
import DownloadLink from "./DownloadLink";

const DownloadPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [files, setFiles] = useState<Blob[] | null>(null);

    useEffect(() => {
        setIsLoading(true);
        download_files().then((response) => {
            setFiles(response);
        });
        setIsLoading(false);
      }, [files, setFiles]);
  return (
    <div className={styles["main-container"]}>
      <PreviewBox header="Download signed file">
        {isLoading && <p>Loading...</p>}
        {files && <>
          <DownloadLink url={URL.createObjectURL(files[0])} caption="Signed document" download="signed.pdf" />
          <DownloadLink url={URL.createObjectURL(files[1])} caption="XML file" download="document.xml" />
        </>}
      </PreviewBox>
    </div>
  );
};

export default DownloadPage;