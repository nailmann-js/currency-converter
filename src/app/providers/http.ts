import axios, { type AxiosResponse } from 'axios'

const httpClient = axios.create({
  baseURL: '',
  timeout: 3000,
})

httpClient.interceptors.response.use(
  async function (response: AxiosResponse) {
    return response.data
  },
  async function (error) {
    const errorMessage = error.response?.statusText
    console.log(errorMessage)
    return Promise.reject(error)
  },
)

export { httpClient }
