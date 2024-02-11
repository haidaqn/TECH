import { BaseResponseDto } from './base.dto';

function BaseResponse<T>(
  data: T,
  message: string,
  status: number,
  success: boolean,
): BaseResponseDto<T> {
  return {
    data,
    message,
    status,
    success,
  };
}

export { BaseResponse };