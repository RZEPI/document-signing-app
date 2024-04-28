import axios from "axios";
import { useRouteLoaderData, LoaderFunction } from "react-router-dom";

import styles from "../styles/DownloadPage.module.css";
import PreviewBox from "../components/PreviewBox";
import DownloadLink from "../components/DownloadLink";
import { DownloadFile } from "../models/DownloadFile";
import { get_file } from "../util/http";
import store from "../store";

const DownloadPage: React.FC<{header:string, loaderId:string}> = ({header, loaderId}) => {
  const files = useRouteLoaderData(loaderId) as DownloadFile[];
  return (
    <div className={styles["main-container"]}>
      <PreviewBox header={header}>
        {files && (
          <>
            {files.map((file) => (
              <DownloadLink
                url={URL.createObjectURL(file.file)}
                caption={file.caption}
                download={file.filename}
              />
            ))}
          </>
        )}
      </PreviewBox>
    </div>
  );
};

export default DownloadPage;

export async function loader(): Promise<DownloadFile[]> {
  const responseSigned = await get_file("http://localhost:5000/download/signed");
  const responseXml = await get_file("http://localhost:5000/download/xml");

  const files: DownloadFile[] = [ {
    file: responseSigned.data,
    caption: "Signed document",
    filename: "signed.pdf",
  },
  { file: responseXml.data, caption: "XML file", filename: "document.xml" },]

  return files;
}

export const loaderCrypto:LoaderFunction = async ({params}) => {
  const filename = params.filename as string;
  const operation = params.operation as string;

  const userPort = store.getState().userType.userType as number;
  const response = await get_file(`http://localhost:${userPort}/crypto?filename=${filename}`);
  
  const files:DownloadFile[] = [
    {
      file: response.data,
      caption: `${operation.replace("ion", "ed")} document`,
      filename: filename,
    }
  ]

  return files;
};
