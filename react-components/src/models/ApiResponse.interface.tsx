export interface ApiResponse<T> {
  /** The HTTP status code from the API response */
  status: number;
  /** The HTTP status message from the API response */
  statusMessage: string;
  /** The response that was provided by the API */
  data: T;
}
