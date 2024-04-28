import FileUpload from "../components/FileUpload";
import axios, { AxiosResponse } from "axios";
import { ActionFunction, redirect, useSearchParams } from "react-router-dom";
import { makeInputName } from "../util";

const FILE_VERIFY_LABEL = "File to verify";
const XML_FILE_LABEL = "XML file with neccessary data";

const VerficationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const result: string | null = searchParams.get("result");

  if (result === "success") return <h1>Verification successful</h1>;
  else if (result === "failure") return <h1>Verification failed</h1>;
  else
    return (
      <>
        <h1>Verification</h1>
        <FileUpload
          fields={[FILE_VERIFY_LABEL, XML_FILE_LABEL]}
          header="Upload files to verify"
        />
      </>
    );
};

export default VerficationPage;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const xml_field_name = makeInputName(XML_FILE_LABEL);
  const file_field_name = makeInputName(FILE_VERIFY_LABEL);
  const xml = formData.get(xml_field_name) as File;
  const file = formData.get(file_field_name) as File;

  const formDataToSend = new FormData();
  formDataToSend.append("xml", xml, "xml.xml");
  formDataToSend.append("doc", file, file.name);
  try {
    const response: AxiosResponse = await axios.post(
      "http://localhost:5000/verify",
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      return redirect("/verify?result=success");
    }
  } catch {
  } finally {
    return redirect("/verify?result=failure");
  }
};
