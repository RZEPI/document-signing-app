import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../styles/PreviewBox.module.css";

const PreviewBox: React.FC<PropsWithChildren<{ header: string, link?:string }>> = ({
  header,
  link="",
  children,
}) => {
  const hoverableClass = link ? styles.hoverable : "";
  const navigate = useNavigate();

  function boxClickHandle(){
    if(link){
      navigate(link);
    }
  
  }

  return (
    <div className={`${styles["preview-box"]} ${hoverableClass}`} onClick={boxClickHandle}>
      <h1>{header}</h1>
      {children}
    </div>
  );
};

export default PreviewBox;
