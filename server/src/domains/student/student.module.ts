import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './student.controller';
import { AccountEntity } from '../../entites/account.entity';
import { SchoolPageEntity } from '../../entites/school-page.entity';
import { NewsFeedEntity } from '../../entites/news-feed.entity';
import { StudentService } from './student.service';
import { StudentNewsEntity } from '../../entites/student-news.entity';

@Module({
	imports: [TypeOrmModule.forFeature([AccountEntity, SchoolPageEntity, NewsFeedEntity, StudentNewsEntity])],
	controllers: [StudentController],
	providers: [StudentService],
	exports: [StudentService],
})
export class StudentModule {}
