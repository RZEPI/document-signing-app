import { CryptoOperation } from "../models/CryptoOperation";

import styles from "../styles/ToggleOperation.module.css";

const ToggleOperation: React.FC<{
  operation: string;
  toggleOperation: ()=>void;
}> = ({ operation, toggleOperation }) => {
  return (
    <div className={styles["toggle-container"]}>
      <span className={operation === CryptoOperation.ENCRYPT ? styles["chosen-operation"] : "undefined"}>{CryptoOperation.ENCRYPT}</span>
      <div className={styles["switch-container"]}>
        <label className={styles.switch}>
          <input type="checkbox" onChange={toggleOperation}/>
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
      </div>
      <span className={operation === CryptoOperation.DECRYPT ? styles["chosen-operation"] : "undefined"}>{CryptoOperation.DECRYPT}</span>
    </div>
  );
};

export default ToggleOperation;
