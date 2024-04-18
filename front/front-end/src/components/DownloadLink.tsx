import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

import styles from "../styles/DownloadLink.module.css";

const DownloadLink: React.FC<{
  url: string;
  caption: string;
  download: string;
}> = ({ url, caption, download }) => {

  return (
    <a className={styles["download-link"]} href={url} download={download}>
      
        <span>{caption}</span>
      
      <FontAwesomeIcon icon={faFloppyDisk} />
    </a>
  );
};

export default DownloadLink;
