import {
  ActionFunction,
  useParams,
  useNavigate,
  redirect,
} from "react-router-dom";
import { send_form } from "../util/http";

import FileUpload from "../components/FileUpload";
import { CryptoOperation } from "../models/CryptoOperation";
import ToggleOperation from "../components/ToggleOperation";
import { makeInputName } from "../util";
import store from "../store";

const FIELD_LABEL_PART = `of the file`;

function makeOperationFieldName(operation: CryptoOperation): string {
  return `${operation} ${FIELD_LABEL_PART}`;
}

const CryptoOperationPage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const operation: CryptoOperation = params.operation as CryptoOperation;
  const fieldName = makeOperationFieldName(operation);

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
      <FileUpload fields={[fieldName]} header={operation} />
    </>
  );
};

export default CryptoOperationPage;

export const action: ActionFunction = async ({ request, params }) => {
  const operation: CryptoOperation | undefined =
    params.operation as CryptoOperation;
  const formData = await request.formData();
  const fieldName = makeInputName(makeOperationFieldName(operation));
  const file = formData.get(fieldName) as File;

  const sendingForm = new FormData();
  sendingForm.append("operation", JSON.stringify(operation));
  sendingForm.append("file", file, file!.name);

  const userPort = store.getState().userType.userType as number;
  const url = `http://localhost:${userPort}/crypto`;

  const response = await send_form(url, sendingForm);

  if (response.status === 200) {
    return redirect(`/crypt-op/${operation}/${response.data.filename}`);
  } else {
    return redirect(`/crypt-op/${operation}/failure`);
  }
};
