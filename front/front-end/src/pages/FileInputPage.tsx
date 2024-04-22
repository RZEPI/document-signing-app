import { ActionFunction, redirect } from "react-router-dom";
import store from "../store";
import { setFile as setFileToStore } from "../store/file";
import FileUpload from "../components/FileUpload";

const FileInputPage: React.FC = () => {
  return (
    <FileUpload fields={["File to sign"]} header="Upload file to signing" />
  );
};

export default FileInputPage;

export const action:ActionFunction = async ({request}) => {
  const formData:FormData = await request.formData();
  store.dispatch(setFileToStore(formData.get("file-to-sign") as File));
  return redirect("/sign/submit");
};