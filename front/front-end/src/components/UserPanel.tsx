import { useAppSelector } from "../store/hooks";
import { getUserType } from "../store/user-type";

import styles from "../styles/UserData.module.css";
import { UserType } from "../models/UserType";
import FileInput from "./FileInput";
import PendriveUnlock from "./PendriveUnlock";
import UserData from "./UserData";
import SubmitionPage from "./SubmitionPage";
import { Stage } from "../models/Stage";
import { getStage } from "../store/stage";


const UserPanel: React.FC = () => {
    var currUserType: UserType = useAppSelector(getUserType);
    var currStage: Stage = useAppSelector(getStage);

    var currStageElement: JSX.Element = <SubmitionPage />;

    if (currStage === Stage.Users_data) {
        currStageElement = <UserData />;
    } else if (currStage === Stage.File_input) {
        currStageElement = <FileInput />;
    } else if(currStage === Stage.Pin){
        currStageElement = <PendriveUnlock />;
    }

    if (currUserType === UserType.User_a) {
        return (
            <div>
                <h1 className={styles["user-name"]}>User A</h1>
                {currStageElement}
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