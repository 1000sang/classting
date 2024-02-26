import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AccountEntity } from '../../../entites/account.entity';
import { NewsFeedEntity } from '../../../entites/news-feed.entity';
import { SchoolPageEntity } from '../../../entites/school-page.entity';
import { StudentNewsEntity } from '../../../entites/student-news.entity';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
	constructor(private configService: ConfigService) {}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			username: this.configService.get<string>('DB_USER'),
			password: this.configService.get<string>('DB_PASSWORD'),
			port: +this.configService.get<number>('DB_PORT'),
			host: this.configService.get<string>('DB_HOST'),
			database: this.configService.get<string>('DB_NAME'),
			// entities: [__dirname + '/../../../dist/**/**/*.entity{.ts,.js}'],
			entities: [AccountEntity, NewsFeedEntity, SchoolPageEntity, StudentNewsEntity],
			synchronize: true, //! set 'false' in production
			autoLoadEntities: true,
			logging: true,
			keepConnectionAlive: false,
			extra: {
				max: 20,
			},
		};
	}
}
