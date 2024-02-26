import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ExceptionCodeEnum } from './exception.enum';

/**
 * 학교 페이지 지역, 이름이 중복될 경우
 */
export class PageAlreadyExistException extends BaseException {
	constructor(errorMessage?: string) {
		super(ExceptionCodeEnum.PageAlreadyExist, HttpStatus.BAD_REQUEST, errorMessage);
	}
}
