import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AccountService } from '../../account.service';
import { JwtAccountPayload } from '../payloads/jwt.account.payload';
import { NotStudentException } from '../../../../exceptions/not.student.exception';

@Injectable()
export class StudentStrategy extends PassportStrategy(Strategy, 'student') {
	constructor(private readonly accountService: AccountService) {
		super({});
	}

	async validate(payload: JwtAccountPayload) {
		const account = await this.accountService.findOneById(payload.id);

		if (account.isStudent) {
			throw new NotStudentException('학생이 아닙니다.');
		}

		return account;
	}
}
