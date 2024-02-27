import { Test } from '@nestjs/testing';
import { AccountEntity } from '../../entites/account.entity';
import { LoginDto } from './dtos/login.dto';
import { LoginPresenter } from './presenters/login.presenter';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

const mockAccountService = {
	login: jest.fn(),
};

const account: AccountEntity = {
	id: 1,
	email: 'email@email.com',
	password: '1234',
	createdAt: new Date(),
	updatedAt: new Date(),
	isStudent: true,
	schoolPages: [],
};

describe('StudentController', () => {
	let accountController: AccountController;
	let accountService: AccountService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				AccountService,
				{
					provide: AccountService,
					useValue: mockAccountService,
				},
			],
			controllers: [AccountController],
		}).compile();

		accountController = module.get<AccountController>(AccountController);
		accountService = module.get<AccountService>(AccountService);
	});

	it('to be defined', async () => {
		expect(accountController).toBeDefined();
		expect(accountService).toBeDefined();
	});

	describe('login', () => {
		it('login controller', async () => {
			const dto: LoginDto = {
				email: 'email@email.com',
				password: '1234',
			};

			const pregenter: LoginPresenter = {
				token: 'token',
			};
			jest.spyOn(accountService, 'login').mockResolvedValue(pregenter);
			expect(await accountController.login(dto)).toBe(pregenter);
		});
	});
});
