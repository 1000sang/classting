/* istanbul ignore file */
import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ExceptionCodeEnum } from './exception.enum';

/**
 * 학교 관리자가 아닌 경우
 */
export class NotSchoolAdminException extends BaseException {
	constructor(errorMessage?: string) {
		super(ExceptionCodeEnum.NotSchoolAdmin, HttpStatus.FORBIDDEN, errorMessage);
	}
}
