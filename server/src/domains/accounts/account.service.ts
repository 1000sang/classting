import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../../entites/account.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { InvalidatePasswordException } from '../../exceptions/invalidate.password.exception';
import { JwtService } from '@nestjs/jwt';
import { LoginPresenter } from './presenters/login.presenter';
import { InternalException } from '../../exceptions/internal.exception';
import { AccountRepositoryProvide } from '../../consts';

@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(Account)
		private readonly accountRepository: Repository<Account>,
		private readonly jwtService: JwtService,
	) {}

	async login(dto: LoginDto) {
		try {
			const account: Account = await this.accountRepository.findOne({
				where: {
					email: dto.email,
				},
			});

			if (!account) {
				throw new InvalidatePasswordException('로그인 정보가 틀렸습니다');
			}

			const passwordValidated: boolean = await bcrypt.compare(dto.password, account.password);

			if (!passwordValidated) {
				throw new InvalidatePasswordException('로그인 정보가 틀렸습니다');
			}

			const token = await this.jwtService.signAsync({
				email: account.email,
				isStudent: account.isStudent,
			});

			return new LoginPresenter({
				token,
			});
		} catch (err) {
			throw new InternalException(err.massage);
		}
	}
}
