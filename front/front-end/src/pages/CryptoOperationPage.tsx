import { ActionFunction, useParams, useNavigate, redirect } from "react-router-dom";
import axios from "axios";

import FileUpload from "../components/FileUpload";
import { CryptoOperation } from "../models/CryptoOperation";
import ToggleOperation from "../components/ToggleOperation";
import { makeInputName } from "../util";
const CryptoOperationPage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const operation: CryptoOperation = params.operation as CryptoOperation;

  function toggleOperationHandler() {
    navigate(
      `/crypt-op/${
        operation === CryptoOperation.ENCRYPT
          ? CryptoOperation.DECRYPT
          : CryptoOperation.ENCRYPT
      }`
    );
  }

  return (
    <>
      <h1>Encrypt/Decrypt document</h1>
      <ToggleOperation
        operation={operation}
        toggleOperation={toggleOperationHandler}
      />
      <FileUpload fields={[`${operation} of the file`]} header={operation} />
    </>
  );
};

export default CryptoOperationPage;

export const action: ActionFunction = async ({ request, params }) => {
  const operation: CryptoOperation | undefined =
    params.operation as CryptoOperation;
  const formData = await request.formData();
  console.log(formData);
  const fieldName = makeInputName(`${operation}-of-the-file`);
  const file = formData.get(fieldName) as File;

  const sendingForm = new FormData();
  sendingForm.append("operation", JSON.stringify(operation));
  sendingForm.append("file", file, file!.name);

  const response = await axios.post(
    "http://localhost:5000/crypto",
    sendingForm,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (response.status === 200) {
    return redirect(`/crypt-op/${operation}/${response.data.filename}`);
  } else {
    return redirect(`/crypt-op/${operation}/failure`);
  }
};
