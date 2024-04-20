import axios from "axios";
import { useRouteLoaderData } from "react-router-dom";

import styles from "../styles/DownloadPage.module.css";
import PreviewBox from "../components/PreviewBox";
import DownloadLink from "../components/DownloadLink";

const DownloadPage: React.FC = () => {;
  const files = useRouteLoaderData("download") as Blob[];;
  return (
    <div className={styles["main-container"]}>
      <PreviewBox header="Download signed file">
        {files && <>
          <DownloadLink url={URL.createObjectURL(files[0])} caption="Signed document" download="signed.pdf" />
          <DownloadLink url={URL.createObjectURL(files[1])} caption="XML file" download="document.xml" />
        </>}
      </PreviewBox>
    </div>
  );
};

export default DownloadPage;

export async function loader(): Promise<Blob[]>
{
  const responseSigned = await axios.get(
    "http://localhost:5000/download/signed",
    {
      responseType: "blob",
    }
  );
  const responseXml = await axios.get("http://localhost:5000/download/xml", {
    responseType: "blob",
  });

  return [responseSigned.data, responseXml.data];
} 