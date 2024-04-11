import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/FileIcon.module.css";

const FileIcon: React.FC<{filename:string}> = ({filename}) => {
    return(<div className={styles["file-icon"]}>
        <FontAwesomeIcon icon={faFile} />
        <span>{filename}</span>
    </div>);
}

export default FileIcon;