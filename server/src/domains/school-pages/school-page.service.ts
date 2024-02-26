import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolPageEntity } from '../../entites/school-page.entity';
import { Repository } from 'typeorm';
import { CreateSchoolPageDto } from './dtos/create.school-page.dto';
import { PageAlreadyExistException } from '../../exceptions/page.already.exist.exception';
import { NewsFeedEntity } from '../../entites/news-feed.entity';
import { CreateNewsFaileException } from '../../exceptions/create.news.faile.exception';
import { SchoolPageNotFoundException } from '../../exceptions/school-page.not.found.exception';
import { CreateSchoolPagePresenter } from './presenters/create.school-page.presenter';

@Injectable()
export class SchoolPageService {
	constructor(
		@InjectRepository(SchoolPageEntity)
		private readonly schoolPageRepository: Repository<SchoolPageEntity>,
		@InjectRepository(NewsFeedEntity)
		private readonly newSpeedRepository: Repository<NewsFeedEntity>,
	) {}

	async create(dto: CreateSchoolPageDto) {
		try {
			await this.schoolPageRepository.insert({
				region: dto.region,
				schoolName: dto.schoolName,
			});

			const schoolPage = await this.schoolPageRepository.findOne({
				where: {
					region: dto.region,
					schoolName: dto.schoolName,
				},
			});

			return new CreateSchoolPagePresenter({
				id: schoolPage.id,
			});
		} catch (err) {
			console.log(err);
			throw new PageAlreadyExistException('지역, 학교명이 이미 존재합니다');
		}
	}

	async createNews(params: { news: string; id: string }) {
		const schoolPage = await this.schoolPageRepository
			.findOneByOrFail({
				id: Number(params.id),
			})
			.catch(err => {
				throw new SchoolPageNotFoundException('학교 페이지를 찾을 수 없습니다.');
			});

		await this.newSpeedRepository.insert({
			news: params.news,
			schoolPage,
		});
	}

	async deleteNews(id: string) {
		const schoolPage = await this.schoolPageRepository
			.findOneByOrFail({
				id: Number(id),
			})
			.catch(err => {
				throw new SchoolPageNotFoundException('학교 페이지를 찾을 수 없습니다.');
			});

		await this.newSpeedRepository.softDelete({ id: Number(id) });
	}

	async updateNews(params: { id: number; news: string }) {
		const schoolPage = await this.schoolPageRepository
			.findOneByOrFail({
				id: params.id,
			})
			.catch(err => {
				throw new SchoolPageNotFoundException('학교 페이지를 찾을 수 없습니다.');
			});

		await this.newSpeedRepository.update(params.id, { news: params.news });
	}
}
