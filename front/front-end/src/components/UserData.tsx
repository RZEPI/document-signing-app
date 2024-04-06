import styles from "../styles/UserForm.module.css";
import UserForm from "./UserForm";

const UserData: React.FC = () => {
  return (
    <div className={styles["form-container"]}>
      <UserForm formTitle={"Your data"} >
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label htmlFor="index">Index</label>
          <input type="number" name="index" />
        </div>
        <div className={styles["group-select"]}>
          <label htmlFor="group">Group</label>
          <select name="group">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </UserForm>
    </div>
  );
};

export default UserData;
