/* istanbul ignore file */
import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ExceptionCodeEnum } from './exception.enum';

/**
 * 학교 페이지를 찾을 수 없는 경우
 */
export class SchoolPageNotFoundException extends BaseException {
	constructor(errorMessage?: string) {
		super(ExceptionCodeEnum.SchoolPageNotFound, HttpStatus.NOT_FOUND, errorMessage);
	}
}
