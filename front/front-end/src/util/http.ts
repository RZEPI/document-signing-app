import axios, { AxiosResponse } from "axios";

export async function send_form(url: string, formData: FormData): Promise<AxiosResponse> {
  return axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function send_json(url: string, data: any): Promise<AxiosResponse> {
  return axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

}

export async function get_file(url: string): Promise<AxiosResponse> {
  return axios.get(url, {
    responseType: "blob",
  });
}