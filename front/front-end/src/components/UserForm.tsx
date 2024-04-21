import styles from "../styles/UserForm.module.css";
import { Form } from "react-router-dom";

const UserForm: React.FC<React.PropsWithChildren<{formTitle:string, buttonCaption:string, buttonBlocked:boolean}>> = ({formTitle, buttonCaption, buttonBlocked, children}) => {  
  return (
    <div className={styles["form-container"]}>
      <h1>{formTitle}</h1>
      <Form className={styles.form} method="post">
        {children}
        <div>
          <button type="submit" disabled={buttonBlocked}>{buttonCaption}</button>
        </div>
      </Form>
    </div>
  );
};

export default UserForm;
