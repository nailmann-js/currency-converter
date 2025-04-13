import { httpClient } from '@/app/providers/http'

export const GET = async <T>(
  url: string,
  params?: { [x: string]: string | number },
  headers?: { [x: string]: string },
  timeout?: number,
): Promise<T> => {
  return httpClient.request({
    url: 'https://status.neuralgeneration.com' + url,
    method: 'GET',
    headers: headers,
    params: params,
    timeout: timeout,
  })
}
