import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setFile as setFileToStore } from "../store/file";
import FileUpload from "../components/FileUpload";

const FileInputPage: React.FC = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();  

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const file = form.get("File to sign") as File;
    dispatch(setFileToStore(file));
    navigation("/sign/submit");
  }

  return (
    <FileUpload onSubmit={submitHandler} fields={["File to sign"]} header="Upload file to signing" />
  );
};

export default FileInputPage;
