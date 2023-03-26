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
  };
  error: AxiosError;
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
      console.log('File uploaded successfully');
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.error('File upload failed');
      return error;
    });
  return result;
};
