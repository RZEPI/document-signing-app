import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/LinkButton.module.css";

const LinkButton: React.FC<PropsWithChildren<{ to: string }>> = ({
  to,
  children,
}) => {
  return (
    <Link to={to} >
      <button className={styles["link-button"]}>{children}</button>
    </Link>
  );
};

export default LinkButton;