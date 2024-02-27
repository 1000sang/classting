import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { SchoolPageEntity } from '../../entites/school-page.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NewsFeedEntity } from '../../entites/news-feed.entity';
import { AccountEntity } from '../../entites/account.entity';
import { SchoolPageNotFoundException } from '../../exceptions/school-page.not.found.exception';
import { StudentService } from './student.service';
import { SchoolPageAlreadySubException } from '../../exceptions/school-page.alread.sub.exception';
import { GetSchoolPageListPresenter } from './presenters/get.school-page.list.presenter';
import { GetNewsPresenter } from './presenters/get.news.presenter';

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
	createQueryBuilder: jest.fn(),
});

const MockAccountRepository = () => ({
	save: jest.fn(),
	findOne: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('StudentService', () => {
	let studentService: StudentService;
	let schoolPageRepository: MockRepository<SchoolPageEntity>;
	let newsFeedRepository: MockRepository<NewsFeedEntity>;
	let accountRepository: MockRepository<AccountEntity>;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				StudentService,
				{
					provide: getRepositoryToken(SchoolPageEntity),
					useValue: MockSchoolPageRepository(),
				},
				{
					provide: getRepositoryToken(NewsFeedEntity),
					useValue: MockNewsFeedRepository(),
				},
				{
					provide: getRepositoryToken(AccountEntity),
					useValue: MockAccountRepository(),
				},
			],
		}).compile();

		studentService = module.get<StudentService>(StudentService);
		schoolPageRepository = module.get<MockRepository<SchoolPageEntity>>(getRepositoryToken(SchoolPageEntity));
		newsFeedRepository = module.get<MockRepository<NewsFeedEntity>>(getRepositoryToken(NewsFeedEntity));
		accountRepository = module.get<MockRepository<AccountEntity>>(getRepositoryToken(AccountEntity));
	});

	describe('subscribe', () => {
		it('구독 성공', async () => {
			const schoolPage = new SchoolPageEntity();
			const account: AccountEntity = {
				id: 1,
				email: 'email@email.com',
				password: '1234',
				createdAt: new Date(),
				updatedAt: new Date(),
				isStudent: true,
				schoolPages: [],
			};
			const subscribeAccount: AccountEntity = {
				id: 1,
				email: 'email@email.com',
				password: '1234',
				createdAt: new Date(),
				updatedAt: new Date(),
				isStudent: true,
				schoolPages: [schoolPage],
			};

			jest.spyOn(schoolPageRepository, 'findOneByOrFail').mockResolvedValue(schoolPage);
			jest.spyOn(accountRepository, 'findOne').mockResolvedValue(account);
			jest.spyOn(accountRepository, 'save').mockResolvedValue(subscribeAccount);

			const result = await studentService.subscribe({ schoolPageId: 2, accountId: 1 });
			expect(result).toEqual(undefined);
		});

		it('학교 페이지를 찾을 수 없을 경우 SchoolPageNotFoundException', async () => {
			jest.spyOn(schoolPageRepository, 'findOneByOrFail').mockRejectedValue(new SchoolPageNotFoundException('학교 페이지를 찾을 수 없습니다.'));

			const result = async () => {
				await studentService.subscribe({ schoolPageId: 2, accountId: 1 });
			};
			await expect(result).rejects.toThrow(new SchoolPageNotFoundException('학교 페이지를 찾을 수 없습니다.'));
		});

		it('이미 구독한 경우 SchoolPageAlreadySubException', async () => {
			const schoolPage = new SchoolPageEntity();
			const account: AccountEntity = {
				id: 1,
				email: 'email@email.com',
				password: '1234',
				createdAt: new Date(),
				updatedAt: new Date(),
				isStudent: true,
				schoolPages: [schoolPage],
			};

			jest.spyOn(schoolPageRepository, 'findOneByOrFail').mockResolvedValue(schoolPage);
			jest.spyOn(accountRepository, 'findOne').mockResolvedValue(account);

			const result = async () => {
				await studentService.subscribe({ schoolPageId: 2, accountId: 1 });
			};
			await expect(result).rejects.toThrow(new SchoolPageAlreadySubException('이미 구독한 학교 페이지입니다.'));
		});
	});

	describe('unsubscribe', () => {
		it('구독 취소 성공', async () => {
			const schoolPage = new SchoolPageEntity();
			const account: AccountEntity = {
				id: 1,
				email: 'email@email.com',
				password: '1234',
				createdAt: new Date(),
				updatedAt: new Date(),
				isStudent: true,
				schoolPages: [schoolPage],
			};
			const unSubscribeAccount: AccountEntity = {
				id: 1,
				email: 'email@email.com',
				password: '1234',
				createdAt: new Date(),
				updatedAt: new Date(),
				isStudent: true,
				schoolPages: [],
			};

			jest.spyOn(schoolPageRepository, 'findOneByOrFail').mockResolvedValue(schoolPage);
			jest.spyOn(accountRepository, 'findOne').mockResolvedValue(account);
			jest.spyOn(accountRepository, 'save').mockResolvedValue(unSubscribeAccount);

			const result = await studentService.unsubscribe({ schoolPageId: 2, accountId: 1 });
			expect(result).toEqual(undefined);
		});

		it('학교 페이지를 찾을 수 없을 경우 SchoolPageNotFoundException', async () => {
			jest.spyOn(schoolPageRepository, 'findOneByOrFail').mockRejectedValue(new SchoolPageNotFoundException('학교 페이지를 찾을 수 없습니다.'));

			const result = async () => {
				await studentService.unsubscribe({ schoolPageId: 2, accountId: 1 });
			};
			await expect(result).rejects.toThrow(new SchoolPageNotFoundException('학교 페이지를 찾을 수 없습니다.'));
		});
	});

	describe('getSchoolPage', () => {
		it('학교 페이지 목록 조회 성공', async () => {
			const schoolPage = new SchoolPageEntity();
			const account: AccountEntity = {
				id: 1,
				email: 'email@email.com',
				password: '1234',
				createdAt: new Date(),
				updatedAt: new Date(),
				isStudent: true,
				schoolPages: [schoolPage],
			};

			jest.spyOn(accountRepository, 'findOne').mockResolvedValue(account);

			const result = await studentService.getSchoolPage({ accountId: 1 });
			expect(result).toEqual({
				data: [
					{
						id: schoolPage.id,
						region: schoolPage.region,
						schoolName: schoolPage.schoolName,
					},
				],
			});
		});
	});

	describe('getNewsFeed', () => {
		it('뉴스피드 조회 성공', async () => {
			const newsFeed: NewsFeedEntity = {
				id: 1,
				news: 'news',
				createdAt: new Date(),
				updatedAt: new Date(),
				schoolPage: {
					id: 10,
					region: 'region1',
					schoolName: 'schoolName1',
					newsFeed: [],
					accounts: [],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			};
			const newsFeeds: NewsFeedEntity[] = [newsFeed];

			newsFeedRepository.createQueryBuilder = jest.fn().mockReturnValue({
				where: jest.fn().mockReturnThis(),
				setParameters: jest.fn().mockReturnThis(),
				leftJoinAndSelect: jest.fn().mockReturnThis(),
				subQuery: jest.fn().mockReturnThis(),
				from: jest.fn().mockReturnThis(),
				select: jest.fn().mockReturnThis(),
				orderBy: jest.fn().mockReturnThis(),
				getMany: jest.fn().mockResolvedValueOnce(newsFeeds),
			});

			const result = await studentService.getNewsFeed({ schoolPageId: 2, accountId: 1 });
			expect(result).toEqual({
				data: newsFeeds.map(newsFeed => {
					return new GetNewsPresenter({
						id: newsFeed.id,
						createdAt: newsFeed.createdAt,
						news: newsFeed.news,
						schoolPage: {
							region: newsFeed.schoolPage.region,
							schoolName: newsFeed.schoolPage.schoolName,
						},
					});
				}),
			});
		});
	});

	describe('getAllNewsFeed', () => {
		it('모든 뉴스피드 조회 성공', async () => {
			const newsFeed1: NewsFeedEntity = {
				id: 1,
				news: 'news',
				createdAt: new Date(),
				updatedAt: new Date(),
				schoolPage: {
					id: 10,
					region: 'region1',
					schoolName: 'schoolName1',
					newsFeed: [],
					accounts: [],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			};
			const newsFeed2: NewsFeedEntity = {
				id: 1,
				news: 'news',
				createdAt: new Date(),
				updatedAt: new Date(),
				schoolPage: {
					id: 11,
					region: 'region2',
					schoolName: 'schoolName2',
					newsFeed: [],
					accounts: [],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			};
			const newsFeeds: NewsFeedEntity[] = [newsFeed1, newsFeed2];

			newsFeedRepository.createQueryBuilder = jest.fn().mockReturnValue({
				where: jest.fn().mockReturnThis(),
				setParameters: jest.fn().mockReturnThis(),
				leftJoinAndSelect: jest.fn().mockReturnThis(),
				subQuery: jest.fn().mockReturnThis(),
				from: jest.fn().mockReturnThis(),
				select: jest.fn().mockReturnThis(),
				orderBy: jest.fn().mockReturnThis(),
				getMany: jest.fn().mockResolvedValueOnce(newsFeeds),
			});

			const result = await studentService.getNewsFeed({ schoolPageId: 2, accountId: 1 });
			expect(result).toEqual({
				data: newsFeeds.map(newsFeed => {
					return new GetNewsPresenter({
						id: newsFeed.id,
						createdAt: newsFeed.createdAt,
						news: newsFeed.news,
						schoolPage: {
							region: newsFeed.schoolPage.region,
							schoolName: newsFeed.schoolPage.schoolName,
						},
					});
				}),
			});
		});
	});
});
