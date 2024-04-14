import axios, { AxiosResponse } from "axios";
import { UserDataType } from "../models/UserDataType";

export async function verify_pin(pin: number): Promise<boolean> {
  const response = await fetch("http://localhost:5000/pin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pin: pin }),
  });
  return response.ok;
}

export async function sign_file(
  userData: { userData: UserDataType },
  formData: FormData
) {
  const response_file: AxiosResponse = await axios.post(
    "http://localhost:5000/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (response_file.status === 200) {
    const response = await fetch("http://localhost:5000/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } else return Promise.resolve("Error occured while uploading file.");
}

export async function download_files(): Promise<[Blob, Blob]>{
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
