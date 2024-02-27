/* istanbul ignore file */
import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ExceptionCodeEnum } from './exception.enum';

/**
 * 학생이 아닌 경우
 */
export class NotStudentException extends BaseException {
	constructor(errorMessage?: string) {
		super(ExceptionCodeEnum.NotStudent, HttpStatus.FORBIDDEN, errorMessage);
	}
}
