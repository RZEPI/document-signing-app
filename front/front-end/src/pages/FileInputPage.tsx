import { ActionFunction, redirect } from "react-router-dom";
import store from "../store";
import { setFile as setFileToStore } from "../store/file";
import FileUpload from "../components/FileUpload";
import { makeInputName } from "../util";

const FIELD_LABEL = "File to sign";

const FileInputPage: React.FC = () => {
  return (
    <FileUpload fields={[FIELD_LABEL]} header="Upload file to signing" />
  );
};

export default FileInputPage;

export const action:ActionFunction = async ({request}) => {
  const formData:FormData = await request.formData();
  const fieldname = makeInputName(FIELD_LABEL);
  store.dispatch(setFileToStore(formData.get(fieldname) as File));
  return redirect("/sign/submit");
};