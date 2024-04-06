import styles from "../styles/SignButton.module.css";


const SignButton: React.FC = ()=>{
    return(
        <button className={styles["sign-button"]}>Sign</button>
    );
};

export default SignButton;