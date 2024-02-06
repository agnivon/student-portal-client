import axios, { CancelToken } from "axios";

export async function getFile(id: string, cancelToken?: CancelToken) {
  return axios
    .get<ArrayBuffer>(`${process.env.NEXT_PUBLIC_API_HOST}/file/${id}`, {
      responseType: "arraybuffer",
      withCredentials: true,
      cancelToken: cancelToken,
    })
    .then((res) => res.data);
}
