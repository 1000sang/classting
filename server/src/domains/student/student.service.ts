import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolPageEntity } from '../../entites/school-page.entity';
import { DataSource, Repository } from 'typeorm';
import { NewsFeedEntity } from '../../entites/news-feed.entity';
import { SchoolPageNotFoundException } from '../../exceptions/school-page.not.found.exception';
import { AccountEntity } from '../../entites/account.entity';
import { SchoolPageAlreadySubException } from '../../exceptions/school-page.alread.sub.exception';

@Injectable()
export class StudentService {
	constructor(
		@InjectRepository(SchoolPageEntity)
		private readonly schoolPageRepository: Repository<SchoolPageEntity>,
		@InjectRepository(NewsFeedEntity)
		private readonly newSpeedRepository: Repository<NewsFeedEntity>,
		@InjectRepository(AccountEntity)
		private readonly accountRepository: Repository<AccountEntity>,
		private readonly dataSource: DataSource,
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
}
