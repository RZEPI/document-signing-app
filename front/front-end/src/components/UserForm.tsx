import styles from "../styles/UserForm.module.css";

const UserForm: React.FC<React.PropsWithChildren<{formTitle:string}>> = ({formTitle, children}) => {
  return (
    <div className={styles["form-container"]}>
      <h1>{formTitle}</h1>
      <form className={styles.form}>
        {children}
      </form>
    </div>
  );
};

export default UserForm;
