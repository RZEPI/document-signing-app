import styles from "../styles/UserData.module.css";
import { UserType } from "../models/UserType";
import FileInput from "./FileInput";
import PendriveUnlock from "./PendriveUnlock";
import UserData from "./UserData";
import SignButton from "./SignButton";

const UserPanel: React.FC<{ userType: UserType }> = ({ userType }) => {
    if (userType === UserType.User_a) {
        return (
            <div>
                <h1 className={styles["user-name"]}>User A</h1>
                <UserData/>
                <FileInput />
                <PendriveUnlock />
                <SignButton />
            </div>
        );
    }else{
        return (
            <>
                <h1>User B</h1>
                <p>User B data</p>
            </>
        );
    }
}


export default UserPanel;