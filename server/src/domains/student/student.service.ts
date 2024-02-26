import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolPageEntity } from '../../entites/school-page.entity';
import { Repository } from 'typeorm';
import { NewsFeedEntity } from '../../entites/news-feed.entity';

@Injectable()
export class StudentService {
	constructor(
		@InjectRepository(SchoolPageEntity)
		private readonly schoolPageRepository: Repository<SchoolPageEntity>,
		@InjectRepository(NewsFeedEntity)
		private readonly newSpeedRepository: Repository<NewsFeedEntity>,
	) {}

	async subscribe(params: { id: number }) {}
}
