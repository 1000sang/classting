import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { AccountEntity } from '../../entites/account.entity';
import { NotFoundAccountException } from '../../exceptions/not.found.account.exception';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { InvalidatePasswordException } from '../../exceptions/invalidate.password.exception';

const MockAccountRepository = () => ({
	findOne: jest.fn(),
	insert: jest.fn(),
	findOneOrFail: jest.fn(),
	findOneByOrFail: jest.fn(),
	find: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('SchoolPageService', () => {
	let accountService: AccountService;
	let jwtService: JwtService;
	let accountRepository: MockRepository<AccountEntity>;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				AccountService,
				{
					provide: getRepositoryToken(AccountEntity),
					useValue: MockAccountRepository(),
				},
				JwtService,
			],
		}).compile();

		accountService = module.get<AccountService>(AccountService);
		jwtService = module.get<JwtService>(JwtService);
		accountRepository = module.get<MockRepository<AccountEntity>>(getRepositoryToken(AccountEntity));
	});

	describe('findOneById', () => {
		const accountEntity: AccountEntity = {
			id: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
			email: 'email@email.com',
			password: '1234',
			isStudent: true,
			schoolPages: [],
		};

		it('계정 찾기 성공', async () => {
			jest.spyOn(accountRepository, 'findOneByOrFail').mockResolvedValue(accountEntity);

			const result = await accountService.findOneById(1);
			expect(result).toEqual(accountEntity);
		});

		it('계정을 찾을 수 없을떄 NotFoundAccountException', async () => {
			jest.spyOn(accountRepository, 'findOneByOrFail').mockRejectedValue(new NotFoundAccountException('계정을 찾을 수 없습니다.'));

			const result = async () => {
				await accountService.findOneById(1);
			};
			await expect(result).rejects.toThrow(new NotFoundAccountException('계정을 찾을 수 없습니다.'));
		});
	});

	describe('insertDefaultAccount', () => {
		const accounts = [
			{
				id: 1,
				email: 'email@email.com',
				password: '1234',
				createdAt: new Date(),
				updatedAt: new Date(),
				isStudent: true,
				schoolPages: [],
			},
		];

		it('기본 계정이 이미 있을때 그냥 스킵', async () => {
			jest.spyOn(accountRepository, 'find').mockResolvedValue(accounts);
			const result = await accountService.insertDefaultAccount();
			expect(result).toEqual(undefined);
		});

		it('기본 계정이 없으면 insert 실행', async () => {
			const accounts = [];

			jest.spyOn(accountRepository, 'find').mockResolvedValue(accounts);
			jest.spyOn(accountRepository, 'insert').mockResolvedValue(null);
			const result = await accountService.insertDefaultAccount();
			expect(result).toEqual(undefined);
		});
	});

	describe('login', () => {
		// it('로그인 성공', async () => {
		// 	const account: AccountEntity = {
		// 		id: 1,
		// 		createdAt: new Date(),
		// 		updatedAt: new Date(),
		// 		email: 'email@email.com',
		// 		password: '1234',
		// 		isStudent: true,
		// 		schoolPages: [],
		// 	};
		//
		// 	const dto: LoginDto = {
		// 		email: 'email@email.com',
		// 		password: '1234',
		// 	};
		//
		// 	jest.spyOn(accountRepository, 'findOneOrFail').mockResolvedValue(account);
		//
		// 	const result = await accountService.login(dto);
		//
		// 	const token = await jwtService.signAsync({
		// 		id: account.id,
		// 		email: account.email,
		// 		isStudent: account.isStudent,
		// 	});
		//
		// 	expect(result).toEqual(token);
		// });
		it('로그인 실패 시 InvalidatePasswordException', async () => {
			const dto: LoginDto = {
				email: 'email@email.com',
				password: '1234',
			};
			jest.spyOn(accountRepository, 'findOneOrFail').mockRejectedValue(new InvalidatePasswordException('로그인 정보가 틀렸습니다'));

			const result = async () => {
				await accountService.login(dto);
			};
			await expect(result).rejects.toThrow(new InvalidatePasswordException('로그인 정보가 틀렸습니다'));
		});
	});
});
