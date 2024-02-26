import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolPageEntity } from '../../entites/school-page.entity';
import { SchoolPageController } from './school-page.controller';
import { SchoolPageService } from './school-page.service';
import { NewsFeedEntity } from '../../entites/news-feed.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([SchoolPageEntity, NewsFeedEntity]),
		// JwtModule.registerAsync({
		// 	imports: [ConfigModule],
		// 	inject: [ConfigService],
		// 	useFactory: async (configService: ConfigService) => ({
		// 		secret: 'secretKey',
		// 	}),
		// }),
	],
	controllers: [SchoolPageController],
	providers: [SchoolPageService],
	exports: [SchoolPageService],
})
export class SchoolPageModule {}
