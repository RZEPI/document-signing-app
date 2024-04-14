import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/FileIcon.module.css";

const FileIcon: React.FC<{file_name:string}> = ({file_name}) => {
    return(<div className={styles["file-icon"]}>
        <FontAwesomeIcon icon={faFile} />
        <span>&nbsp;&nbsp;{file_name}</span>
    </div>);
}

export default FileIcon;