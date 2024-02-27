import { Test } from '@nestjs/testing';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { AccountEntity } from '../../entites/account.entity';
import { CurrentAccount } from '../../decorators/account.decorator';
import { SchoolPageEntity } from '../../entites/school-page.entity';

const mockStudentService = {
	subscribe: jest.fn(),
	unsubscribe: jest.fn(),
	getSchoolPage: jest.fn(),
	getNewsFeed: jest.fn(),
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
	let studentController: StudentController;
	let studentService: StudentService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				StudentService,
				{
					provide: StudentService,
					useValue: mockStudentService,
				},
			],
			controllers: [StudentController],
		}).compile();

		studentController = module.get<StudentController>(StudentController);
		studentService = module.get<StudentService>(StudentService);
	});

	it('to be defined', async () => {
		expect(studentController).toBeDefined();
		expect(studentService).toBeDefined();
	});

	describe('subscribe', () => {
		it('subscribe controller', async () => {
			jest.spyOn(studentService, 'subscribe').mockImplementation(() => undefined);
			expect(await studentController.subscribe('1', account)).toBe(undefined);
		});
	});

	describe('unsubscribe', () => {
		it('unsubscribe controller', async () => {
			jest.spyOn(studentService, 'unsubscribe').mockImplementation(() => undefined);
			expect(await studentController.subscribe('1', account)).toBe(undefined);
		});
	});

	describe('getSchoolPage', () => {
		it('getSchoolPage controller', async () => {
			jest.spyOn(studentService, 'getSchoolPage').mockImplementation(() => undefined);
			expect(await studentController.getSchoolPage(account)).toBe(undefined);
		});
	});

	describe('getNewsFeed', () => {
		it('getSchoolPage controller', async () => {
			jest.spyOn(studentService, 'getNewsFeed').mockImplementation(() => undefined);
			expect(await studentController.getNewsFeed('1', account)).toBe(undefined);
		});
	});
});
