import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolPageEntity } from '../../entites/school-page.entity';
import { Repository } from 'typeorm';
import { CreateSchoolPageDto } from './dtos/create.school-page.dto';
import { PageAlreadyExistException } from '../../exceptions/page.already.exist.exception';

@Injectable()
export class SchoolPageService {
	constructor(
		@InjectRepository(SchoolPageEntity)
		private readonly schoolPageRepository: Repository<SchoolPageEntity>,
	) {}

	async create(dto: CreateSchoolPageDto) {
		try {
			await this.schoolPageRepository.insert({
				region: dto.region,
				schoolName: dto.schoolName,
			});
		} catch (err) {
			console.log(err);
			throw new PageAlreadyExistException('지역, 학교명이 이미 존재합니다');
		}
	}
}
