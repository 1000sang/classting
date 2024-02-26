import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ExceptionCodeEnum } from './exception.enum';

/**
 * 소식 작성 실패했을 경우
 */
export class CreateNewsFaileException extends BaseException {
	constructor(errorMessage?: string) {
		super(ExceptionCodeEnum.CreateNewsFail, HttpStatus.INTERNAL_SERVER_ERROR, errorMessage);
	}
}
