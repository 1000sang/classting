import { Module } from '@nestjs/common';
import { AccountModule } from './domains/accounts/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule } from './config/db/postgres/postgres.module';
import { PostgresConfigService } from './config/db/postgres/postgres.service';
import { ConfigModule } from '@nestjs/config';
import { SchoolPageModule } from './domains/school-pages/school-page.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [PostgresConfigModule],
			inject: [PostgresConfigService],
			useClass: PostgresConfigService,
		}),
		AccountModule,
		SchoolPageModule,
	],
})
export class AppModule {}
