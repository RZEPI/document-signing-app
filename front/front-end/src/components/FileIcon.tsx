import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/FileIcon.module.css";

const FileIcon: React.FC<{fileName:string}> = ({fileName}) => {
    return(<div className={styles["file-icon"]}>
        <FontAwesomeIcon icon={faFile} />
        <span>&nbsp;&nbsp;{fileName.slice(0, 20)}</span>
    </div>);
}

export default FileIcon;