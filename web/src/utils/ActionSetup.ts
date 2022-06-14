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
}: ActionSetupT) => {
  try {
    const res = await axios()({
      method,
      responseType,
      headers: { ContentType: contentType || 'application/json' },
      url,
      data
    });
    return onSuccess(res.data);
  } catch (error: any) {
    return onError(error.response);
  }
};
