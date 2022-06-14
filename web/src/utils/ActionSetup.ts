import axios from './AxiosSetup';
import { ActionSetupT } from '@/generated/Utils';

export const action = async ({
  onError,
  onSuccess,
  method,
  contentType,
  responseType,
  url,
  data,
  onProgress,
}: ActionSetupT) => {
  try {
    const res = await axios()({
      method,
      responseType,
      headers: { ContentType: contentType || 'application/json' },
      url,
      data,
      onUploadProgress: (event) => {
        const percentage = Math.round((event.loaded * 100) / event.total);
        if (onProgress) {
          onProgress(percentage);
        }
      },
    });
    return onSuccess(res.data);
  } catch (error: any) {
    return onError(error.response);
  }
};
