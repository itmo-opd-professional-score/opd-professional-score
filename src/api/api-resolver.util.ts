import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import apiConf from './apiConf';

interface RequestConfig<T> extends AxiosRequestConfig {
  data?: T;
}

class ApiResolverUtil {
  private readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async request<U, S>(
    url: string,
    method: string,
    data?: U,
    jwt?: string,
  ): Promise<S> {
    const fullUrl = `${apiConf.endpoint}/${this.endpoint}/${url}`;

    const config: RequestConfig<U> = {
      url: fullUrl,
      method,
      data,
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : undefined,
      },
    };

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
      const response: AxiosResponse<S> = await axios(config);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
      return response.data;
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw new Error('Неизвестная ошибка');
      }
    }
  }
}

export default ApiResolverUtil;
