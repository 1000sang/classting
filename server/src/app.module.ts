import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './domains/accounts/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule } from './config/db/postgres/postgres.module';
import { PostgresConfigService } from './config/db/postgres/postgres.service';
import { ConfigModule } from '@nestjs/config';

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
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
