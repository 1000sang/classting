import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ExceptionCodeEnum } from './exception.enum';

/**
 * 이미 구독한 학교페이지인 경우
 */
export class SchoolPageAlreadySubException extends BaseException {
	constructor(errorMessage?: string) {
		super(ExceptionCodeEnum.SchoolPageAlreadySub, HttpStatus.BAD_REQUEST, errorMessage);
	}
}
