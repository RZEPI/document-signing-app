import UserForm from "./UserForm";

const PendriveUnlock: React.FC = () => {
  return (
    <>
      <UserForm formTitle={"PIN"}>
        <div>
          <label htmlFor="pin">Enter the pin number</label>
          <input type="password" name="pin" placeholder="PIN" />
        </div>
        <div>
          <button type="submit">Unlock</button>
        </div>
      </UserForm>
    </>
  );
};

export default PendriveUnlock;
