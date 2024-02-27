import { SchoolPageService } from './school-page.service';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { SchoolPageEntity } from '../../entites/school-page.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NewsFeedEntity } from '../../entites/news-feed.entity';
import { StudentNewsEntity } from '../../entites/student-news.entity';
import { CreateSchoolPageDto } from './dtos/create.school-page.dto';
import { CreateSchoolPagePresenter } from './presenters/create.school-page.presenter';
import { PageAlreadyExistException } from '../../exceptions/page.already.exist.exception';
import { SchoolPageNotFoundException } from '../../exceptions/school-page.not.found.exception';
import { AccountEntity } from '../../entites/account.entity';

const MockSchoolPageRepository = () => ({
	findOne: jest.fn(),
	create: jest.fn(),
	save: jest.fn(),
	findOneByOrFail: jest.fn(),
});

const MockNewsFeedRepository = () => ({
	create: jest.fn(),
	save: jest.fn(),
	softDelete: jest.fn(),
	update: jest.fn(),
});

const MockStudentNewsRepository = () => ({
	save: jest.fn(),
	create: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('SchoolPageService', () => {
	let schoolPageService: SchoolPageService;
	let schoolPageRepository: MockRepository<SchoolPageEntity>;
	let newsFeedRepository: MockRepository<NewsFeedEntity>;
	let studentNewsRepository: MockRepository<StudentNewsEntity>;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				SchoolPageService,
				{
					provide: getRepositoryToken(SchoolPageEntity),
					useValue: MockSchoolPageRepository(),
				},
				{
					provide: getRepositoryToken(NewsFeedEntity),
					useValue: MockNewsFeedRepository(),
				},
				{
					provide: getRepositoryToken(StudentNewsEntity),
					useValue: MockStudentNewsRepository(),
				},
			],
		}).compile();

		schoolPageService = module.get<SchoolPageService>(SchoolPageService);
		schoolPageRepository = module.get<MockRepository<SchoolPageEntity>>(getRepositoryToken(SchoolPageEntity));
		newsFeedRepository = module.get<MockRepository<NewsFeedEntity>>(getRepositoryToken(NewsFeedEntity));
		studentNewsRepository = module.get<MockRepository<StudentNewsEntity>>(getRepositoryToken(StudentNewsEntity));
	});

	describe('create', () => {
		const dto: CreateSchoolPageDto = {
			region: 'region',
			schoolName: 'schoolName',
		};

		const presenter: CreateSchoolPagePresenter = {
			id: 1,
		};

		const schoolPageEntity: SchoolPageEntity = {
			id: 1,
			region: 'region',
			schoolName: 'schoolName',
			createdAt: new Date(),
			updatedAt: new Date(),
			newsFeed: [],
			accounts: [],
		};

		it('학교 페이지 생성 성공', async () => {
			jest.spyOn(schoolPageRepository, 'findOne').mockResolvedValue(null);
			jest.spyOn(schoolPageRepository, 'create').mockResolvedValue(schoolPageEntity);
			jest.spyOn(schoolPageRepository, 'save').mockResolvedValue(schoolPageEntity);

			const result = await schoolPageService.create(dto);
			expect(result).toEqual(presenter);
		});

		it('지역, 학교명이 이미 존재하는 경우 PageAlreadyExistException', async () => {
			jest.spyOn(schoolPageRepository, 'findOne').mockResolvedValue(schoolPageEntity);

			const result = async () => {
				await schoolPageService.create(dto);
			};

			await expect(result).rejects.toThrow(new PageAlreadyExistException('지역, 학교명이 이미 존재합니다'));
		});
	});

	describe('createNews', () => {
		const params: { news: string; id: number } = {
			news: 'news',
			id: 1,
		};

		it('학교 소식 작성 성공', async () => {
			const newsFeed: NewsFeedEntity = {
				id: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
				news: 'news',
				schoolPage: new SchoolPageEntity(),
			};

			const schoolPage: SchoolPageEntity = {
				id: 1,
				region: 'region',
				schoolName: 'schoolName',
				createdAt: new Date(),
				updatedAt: new Date(),
				newsFeed: [],
				accounts: [
					{
						id: 1,
						email: 'email@email.com',
						password: '1234',
						createdAt: new Date(),
						updatedAt: new Date(),
						isStudent: true,
						schoolPages: [],
					},
					{
						id: 2,
						email: 'email2@email.com',
						password: '1234',
						createdAt: new Date(),
						updatedAt: new Date(),
						isStudent: true,
						schoolPages: [],
					},
					{
						id: 3,
						email: 'email3@email.com',
						password: '1234',
						createdAt: new Date(),
						updatedAt: new Date(),
						isStudent: true,
						schoolPages: [],
					},
				],
			};

			const studentNews: StudentNewsEntity = {
				id: 1,
				newsFeedId: 2,
				accountId: 1,
				schoolPageId: 1,
			};

			jest.spyOn(schoolPageRepository, 'findOne').mockResolvedValue(schoolPage);
			jest.spyOn(newsFeedRepository, 'create').mockResolvedValue(newsFeed);
			jest.spyOn(newsFeedRepository, 'save').mockResolvedValue(newsFeed);
			jest.spyOn(studentNewsRepository, 'save').mockResolvedValue(studentNews);
			jest.spyOn(studentNewsRepository, 'create').mockResolvedValue(studentNews);

			const result = await schoolPageService.createNews(params);
			expect(result).toBe(undefined);
		});

		it('학교 페이지를 찾을 수 없을 경우 SchoolPageNotFoundException', async () => {
			jest.spyOn(schoolPageRepository, 'findOne').mockResolvedValue(null);
			const result = async () => {
				await schoolPageService.createNews(params);
			};
			await expect(result).rejects.toThrow(new SchoolPageNotFoundException('학교 페이지를 찾을 수 없습니다.'));
		});
	});

	describe('deleteNews', () => {
		const schoolPageEntity: SchoolPageEntity = {
			id: 1,
			region: 'region',
			schoolName: 'schoolName',
			createdAt: new Date(),
			updatedAt: new Date(),
			newsFeed: [],
			accounts: [],
		};

		const updateResult = { generatedMaps: [], raw: [], affected: 1 };

		it('소식 삭제 성공', async () => {
			jest.spyOn(schoolPageRepository, 'findOneByOrFail').mockResolvedValue(schoolPageEntity);
			jest.spyOn(newsFeedRepository, 'softDelete').mockResolvedValue(updateResult);
			const result = await schoolPageService.deleteNews({ schoolPageId: 1, newsFeedId: 2 });
			expect(result).toEqual(undefined);
		});

		it('학교 페이지를 찾을 수 없을때 SchoolPageNotFoundException', async () => {
			jest.spyOn(schoolPageRepository, 'findOneByOrFail').mockRejectedValue(new SchoolPageNotFoundException('학교 페이지를 찾을 수 없습니다.'));

			const result = async () => {
				await schoolPageService.deleteNews({ schoolPageId: 1, newsFeedId: 2 });
			};
			await expect(result).rejects.toThrow(new SchoolPageNotFoundException('학교 페이지를 찾을 수 없습니다.'));
		});
	});

	describe('updateNews', () => {
		const schoolPageEntity: SchoolPageEntity = {
			id: 1,
			region: 'region',
			schoolName: 'schoolName',
			createdAt: new Date(),
			updatedAt: new Date(),
			newsFeed: [],
			accounts: [],
		};

		const updateResult = { generatedMaps: [], raw: [], affected: 1 };

		it('학교 소식 업데이트 성공', async () => {
			jest.spyOn(schoolPageRepository, 'findOneByOrFail').mockResolvedValue(schoolPageEntity);
			jest.spyOn(newsFeedRepository, 'update').mockResolvedValue(updateResult);

			const result = await schoolPageService.updateNews({ schoolPageId: 1, newsFeedId: 2, news: 'updated news' });
			expect(result).toEqual(undefined);
		});
		it('학교 페이지를 찾을 수 없을 경우 SchoolPageNotFoundException', async () => {
			jest.spyOn(schoolPageRepository, 'findOneByOrFail').mockRejectedValue(new SchoolPageNotFoundException('학교 페이지를 찾을 수 없습니다.'));

			const result = async () => {
				await schoolPageService.updateNews({ schoolPageId: 1, newsFeedId: 2, news: 'updated news' });
			};
			await expect(result).rejects.toThrow(new SchoolPageNotFoundException('학교 페이지를 찾을 수 없습니다.'));
		});
	});
});
