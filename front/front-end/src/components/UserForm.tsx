import styles from "../styles/UserForm.module.css";

const UserForm: React.FC<React.PropsWithChildren<{formTitle:string, buttonCaption:string, onSubmit: (e: React.FormEvent<HTMLFormElement>)=>void}>> = ({formTitle, buttonCaption, onSubmit, children}) => {
  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    onSubmit(e);
  }
  return (
    <div className={styles["form-container"]}>
      <h1>{formTitle}</h1>
      <form className={styles.form} onSubmit={submitHandler}>
        {children}
        <div>
          <button type="submit">{buttonCaption}</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
