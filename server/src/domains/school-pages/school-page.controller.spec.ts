import { Test } from '@nestjs/testing';
import { AccountEntity } from '../../entites/account.entity';
import { SchoolPageController } from './school-page.controller';
import { SchoolPageService } from './school-page.service';
import { CreateSchoolPageDto } from './dtos/create.school-page.dto';
import { CreateSchoolPagePresenter } from './presenters/create.school-page.presenter';
import { CreateNewsFeedDto } from './dtos/create.news-feed.dto';
import { UpdateNewsFeedDto } from './dtos/update.news-feed.dto';

const mockSchoolPageService = {
	create: jest.fn(),
	createNews: jest.fn(),
	deleteNews: jest.fn(),
	updateNews: jest.fn(),
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
	let schoolPageController: SchoolPageController;
	let schoolPageService: SchoolPageService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				SchoolPageService,
				{
					provide: SchoolPageService,
					useValue: mockSchoolPageService,
				},
			],
			controllers: [SchoolPageController],
		}).compile();

		schoolPageController = module.get<SchoolPageController>(SchoolPageController);
		schoolPageService = module.get<SchoolPageService>(SchoolPageService);
	});

	it('to be defined', async () => {
		expect(schoolPageController).toBeDefined();
		expect(schoolPageService).toBeDefined();
	});

	describe('create', () => {
		it('create controller', async () => {
			const dto: CreateSchoolPageDto = {
				region: 'region',
				schoolName: 'schoolName',
			};

			const pregenter: CreateSchoolPagePresenter = {
				id: 1,
			};

			jest.spyOn(schoolPageService, 'create').mockResolvedValue(pregenter);
			expect(await schoolPageController.create(dto)).toBe(pregenter);
		});
	});

	describe('createNews', () => {
		it('create controller', async () => {
			const dto: CreateNewsFeedDto = {
				news: 'news',
			};

			jest.spyOn(schoolPageService, 'createNews').mockResolvedValue(undefined);
			expect(await schoolPageController.createNews(dto, '1')).toBe(undefined);
		});
	});

	describe('deleteNews', () => {
		it('create controller', async () => {
			jest.spyOn(schoolPageService, 'deleteNews').mockResolvedValue(undefined);
			expect(await schoolPageController.deleteNews('1', '2')).toBe(undefined);
		});
	});

	describe('updateNews', () => {
		it('create controller', async () => {
			const body: UpdateNewsFeedDto = {
				news: 'news',
			};
			jest.spyOn(schoolPageService, 'updateNews').mockResolvedValue(undefined);
			expect(await schoolPageController.updateNews(body, '2', '3')).toBe(undefined);
		});
	});
});
