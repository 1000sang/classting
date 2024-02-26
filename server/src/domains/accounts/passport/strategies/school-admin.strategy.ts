import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AccountService } from '../../account.service';
import { JwtAccountPayload } from '../payloads/jwt.account.payload';
import { NotSchoolAdminException } from '../../../../exceptions/not.school-admin.exception';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SchoolAdminStrategy extends PassportStrategy(Strategy, 'school-admin') {
	constructor(
		private readonly accountService: AccountService,
		private readonly configService: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get('SECRET_KEY'),
			ignoreExpiration: false,
		});
	}

	async validate(payload: JwtAccountPayload) {
		const account = await this.accountService.findOneById(payload.id);

		if (account.isStudent) {
			throw new NotSchoolAdminException('학교 관리자가 아닙니다.');
		}

		return account;
	}
}
