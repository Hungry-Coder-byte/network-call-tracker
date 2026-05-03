export interface ICall {
  id: string;
  payload: string;
  response: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISettings {
  theme: 'light' | 'dark';
  notifications: boolean;
}

export interface ILoginResponse {
  token: string;
}

export interface IApiError {
  message: string;
  status: number;
}

export interface IApiResponse<T> {
  data: T;
  error?: IApiError;
}