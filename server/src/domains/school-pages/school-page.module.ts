import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolPageEntity } from '../../entites/school-page.entity';
import { SchoolPageController } from './school-page.controller';
import { SchoolPageService } from './school-page.service';
import { NewSpeedEntity } from '../../entites/new-speed.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([SchoolPageEntity, NewSpeedEntity]),
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
