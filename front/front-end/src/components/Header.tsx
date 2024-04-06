import styles from "../styles/Header.module.css";
import { UserType } from "../models/UserType";
import { PanelType } from "../models/PanelType";

const Header: React.FC<{
  currUserType: UserType;
  onUserTypeChange: (userType: UserType) => void;
}> = ({ currUserType, onUserTypeChange }) => {
  function userTypeChangeHandler(userType: UserType) {
    onUserTypeChange(userType);
  }

  var panelsData: PanelType[] = [
    { name: "User A", type: UserType.User_a },
    { name: "User B", type: UserType.User_b },
  ];

  var panels = panelsData.map((panel) => (
    <h2
      key={panel.type}
      onClick={() => userTypeChangeHandler(panel.type)}
      className={currUserType === panel.type ? styles.active : ""}
    >
      {panel.name}
    </h2>
  ));

  return (
    <header className={styles["main-header"]}>
      <div className={styles["button_container"]}>{panels}</div>
    </header>
  );
};

export default Header;
