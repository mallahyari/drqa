import axios, {
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosProgressEvent,
} from 'axios';

const uploadUrl: string = 'http://localhost:8000';

export interface Config extends AxiosRequestConfig {
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  headers?: Record<string, string>;
}

export interface fileUploadResponse {
  data: {
    filename: string;
    status: string;
  };
  error?: AxiosError | null;
}

export const uploadDocument = async (
  endpoint: string,
  file: File,
  config: Config
) => {
  const formData = new FormData();
  formData.append('file', file);
  const result: fileUploadResponse = await axios
    .post(`${uploadUrl}/${endpoint}`, formData, config)
    .then((response: AxiosResponse) => {
      const data = response.data;
      return { data };
    });
  // .catch((error: AxiosError) => {
  //   console.error('File upload failed');
  //   // return { data: { filename: '' }, error: error };
  // });
  return result;
};
