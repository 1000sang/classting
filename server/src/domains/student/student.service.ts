import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolPageEntity } from '../../entites/school-page.entity';
import { DataSource, Repository } from 'typeorm';
import { NewsFeedEntity } from '../../entites/news-feed.entity';
import { SchoolPageNotFoundException } from '../../exceptions/school-page.not.found.exception';
import { AccountEntity } from '../../entites/account.entity';
import { SchoolPageAlreadySubException } from '../../exceptions/school-page.alread.sub.exception';
import { LoginPresenter } from '../accounts/presenters/login.presenter';
import { GetSchoolPageListPresenter } from './presenters/get.school-page.list.presenter';
import { StudentNewsEntity } from '../../entites/student-news.entity';
import { GetNewsPresenter } from './presenters/get.news.presenter';

@Injectable()
export class StudentService {
	constructor(
		@InjectRepository(SchoolPageEntity)
		private readonly schoolPageRepository: Repository<SchoolPageEntity>,
		@InjectRepository(AccountEntity)
		private readonly accountRepository: Repository<AccountEntity>,
		@InjectRepository(NewsFeedEntity)
		private readonly newsFeedRepository: Repository<NewsFeedEntity>,
		@InjectRepository(StudentNewsEntity)
		private readonly studentNewsRepository: Repository<StudentNewsEntity>,
	) {}

	async subscribe(params: { schoolPageId: number; accountId: number }) {
		// 학교 페이지가 존재하는지 확인
		const schoolPage = await this.schoolPageRepository.findOneByOrFail({ id: params.schoolPageId }).catch(() => {
			throw new SchoolPageNotFoundException('학교 페이지를 찾을 수 없습니다.');
		});

		// 이미 구독한 학교 페이지인지 확인
		const account = await this.accountRepository.findOne({
			relations: ['schoolPages'],
			where: { id: params.accountId },
		});

		const subs = account.schoolPages;

		for (let sub of subs) {
			if (sub.id === schoolPage.id) {
				throw new SchoolPageAlreadySubException('이미 구독한 학교 페이지입니다.');
			}
		}

		subs.push(schoolPage);

		account.schoolPages = subs;

		// 구독
		await this.accountRepository.save(account);
	}

	async unsubscribe(params: { schoolPageId: number; accountId: number }) {
		// 학교 페이지가 존재하는지 확인
		await this.schoolPageRepository.findOneByOrFail({ id: params.schoolPageId }).catch(() => {
			throw new SchoolPageNotFoundException('학교 페이지를 찾을 수 없습니다.');
		});

		// 구독한 학교페이지인지 확인
		const account = await this.accountRepository.findOne({
			relations: ['schoolPages'],
			where: {
				id: params.accountId,
			},
		});

		// schoolPage 제외
		account.schoolPages = account.schoolPages.filter(sub => sub.id !== params.schoolPageId);

		// 구독 해제
		await this.accountRepository.save(account);
	}

	async getSchoolPage(params: { accountId: number }) {
		const account = await this.accountRepository.findOne({
			relations: ['schoolPages'],
			where: {
				id: params.accountId,
			},
		});

		return {
			data: account.schoolPages.map(schoolPage => {
				return new GetSchoolPageListPresenter({
					id: schoolPage.id,
					region: schoolPage.region,
					schoolName: schoolPage.schoolName,
				});
			}),
		};
	}

	async getNewsFeed(params: { accountId: number; schoolPageId: number }) {
		const newsFeeds = await this.newsFeedRepository
			.createQueryBuilder('nf')
			.where(qb => {
				const subQuery = qb.subQuery().from(StudentNewsEntity, 'sn').select('sn.newsFeedId').where('sn.accountId = :accountId AND sn.schoolPageId = :schoolPageId').getQuery();
				return 'nf.id IN' + subQuery;
			})
			.setParameters({ accountId: params.accountId, schoolPageId: params.schoolPageId })
			.orderBy('nf.createdAt', 'DESC')
			.getMany();

		return {
			data: newsFeeds.map(newsFeed => {
				return new GetNewsPresenter({
					id: newsFeed.id,
					createdAt: newsFeed.createdAt,
					news: newsFeed.news,
				});
			}),
		};
	}
}
