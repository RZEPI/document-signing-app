import { PropsWithChildren } from "react";

import styles from "../styles/PreviewBox.module.css";

const PreviewBox: React.FC<PropsWithChildren<{ header: string }>> = ({
  header,
  children,
}) => {
  return (
    <div className={styles["preview-box"]}>
      <h1>{header}</h1>
      {children}
    </div>
  );
};

export default PreviewBox;
