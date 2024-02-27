import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../../entites/account.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dtos/login.dto';
import { InvalidatePasswordException } from '../../exceptions/invalidate.password.exception';
import { JwtService } from '@nestjs/jwt';
import { LoginPresenter } from './presenters/login.presenter';
import { NotFoundAccountException } from '../../exceptions/not.found.account.exception';

const defaultAccount = [
	{ email: 'admin1@gmail.com', password: '1234', isStudent: false },
	{ email: 'admin2@gmail.com', password: '1234', isStudent: false },
	{ email: 'student1@gmail.com', password: '1234', isStudent: true },
	{ email: 'student2@gmail.com', password: '1234', isStudent: true },
	{ email: 'student3@gmail.com', password: '1234', isStudent: true },
];

@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(AccountEntity)
		private readonly accountRepository: Repository<AccountEntity>,
		private readonly jwtService: JwtService,
	) {}

	async findOneById(id: number) {
		return await this.accountRepository.findOneByOrFail({ id }).catch(err => {
			throw new NotFoundAccountException('계정을 찾을 수 없습니다.');
		});
	}

	async insertDefaultAccount() {
		const result = await this.accountRepository.find({});
		if (result.length < 1) {
			await this.accountRepository.insert(defaultAccount);
		}
	}

	async login(dto: LoginDto) {
		const account: AccountEntity = await this.accountRepository
			.findOneOrFail({
				where: {
					email: dto.email,
					password: dto.password,
				},
			})
			.catch(() => {
				throw new InvalidatePasswordException('로그인 정보가 틀렸습니다');
			});

		const token = await this.jwtService.signAsync({
			id: account.id,
			email: account.email,
			isStudent: account.isStudent,
		});

		return new LoginPresenter({
			token,
		});
	}
}
