import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolPageEntity } from '../../entites/school-page.entity';
import { Repository } from 'typeorm';
import { CreateSchoolPageDto } from './dtos/create.school-page.dto';
import { PageAlreadyExistException } from '../../exceptions/page.already.exist.exception';
import { NewsFeedEntity } from '../../entites/news-feed.entity';
import { SchoolPageNotFoundException } from '../../exceptions/school-page.not.found.exception';
import { CreateSchoolPagePresenter } from './presenters/create.school-page.presenter';
import { StudentNewsEntity } from '../../entites/student-news.entity';

@Injectable()
export class SchoolPageService {
	constructor(
		@InjectRepository(SchoolPageEntity)
		private readonly schoolPageRepository: Repository<SchoolPageEntity>,
		@InjectRepository(NewsFeedEntity)
		private readonly newsFeedRepository: Repository<NewsFeedEntity>,
		@InjectRepository(StudentNewsEntity)
		private readonly studentNewsRepository: Repository<StudentNewsEntity>,
	) {}

	async create(dto: CreateSchoolPageDto) {
		const isSchoolPageExist = await this.schoolPageRepository.findOne({
			where: {
				region: dto.region,
				schoolName: dto.schoolName,
			},
		});

		if (isSchoolPageExist) {
			throw new PageAlreadyExistException('지역, 학교명이 이미 존재합니다');
		}

		const schoolPageEntity = this.schoolPageRepository.create({
			region: dto.region,
			schoolName: dto.schoolName,
		});

		const schoolPage = await this.schoolPageRepository.save(schoolPageEntity);

		return new CreateSchoolPagePresenter({
			id: schoolPage.id,
		});
	}

	async createNews(params: { news: string; id: number }) {
		// 학교 페이지가 존재하는지 확인
		const schoolPage = await this.schoolPageRepository.findOne({
			relations: ['accounts'],
			where: { id: params.id },
		});

		if (!schoolPage) {
			throw new SchoolPageNotFoundException('학교 페이지를 찾을 수 없습니다.');
		}

		// newsfeed 테이블에 소식 insert
		const newsFeed = this.newsFeedRepository.create({
			news: params.news,
			schoolPage,
		});

		//newsfeed 조회해서 id 찾기
		const newsFeedEntity = await this.newsFeedRepository.save(newsFeed);

		// 학교 페이지를 구독중인 학생
		const subscribers = schoolPage.accounts;

		const studentNewsEntities: {
			schoolPageId: number;
			newsFeedId: number;
			accountId: number;
		}[] = subscribers.map(subscriber => {
			return this.studentNewsRepository.create({
				schoolPageId: schoolPage.id,
				newsFeedId: newsFeedEntity.id,
				accountId: subscriber.id,
			});
		});

		// 학생 뉴스피드 테이블에 업데이트
		await this.studentNewsRepository.save(studentNewsEntities);
	}
	async deleteNews(params: { schoolPageId: number; newsFeedId: number }) {
		const schoolPage = await this.schoolPageRepository
			.findOneByOrFail({
				id: params.schoolPageId,
			})
			.catch(err => {
				throw new SchoolPageNotFoundException('학교 페이지를 찾을 수 없습니다.');
			});

		await this.newsFeedRepository.softDelete({ id: params.newsFeedId });
	}

	async updateNews(params: { schoolPageId: number; newsFeedId: number; news: string }) {
		const schoolPage = await this.schoolPageRepository
			.findOneByOrFail({
				id: params.schoolPageId,
			})
			.catch(err => {
				throw new SchoolPageNotFoundException('학교 페이지를 찾을 수 없습니다.');
			});

		await this.newsFeedRepository.update(params.newsFeedId, { news: params.news });
	}
}
