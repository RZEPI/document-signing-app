import styles from "../styles/UserForm.module.css";
import UserForm from "./UserForm";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getUserData } from "../store/user-data";

const UserData: React.FC = () => {
  var dispatch = useAppDispatch();
  var userData = useAppSelector(getUserData);
  return (
    <div className={styles["form-container"]}>
      <UserForm formTitle={"Your data"} >
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={userData.name} />
        </div>
        <div>
          <label htmlFor="index">Index</label>
          <input type="number" name="index" value={userData.index}/>
        </div>
        <div className={styles["group-select"]}>
          <label htmlFor="group">Group</label>
          <select name="group" value={userData.group}>
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
