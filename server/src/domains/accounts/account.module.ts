/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../../entites/account.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentStrategy } from './passport/strategies/student.strategy';
import { SchoolAdminStrategy } from './passport/strategies/school-admin.strategy';

@Module({
	imports: [
		TypeOrmModule.forFeature([AccountEntity]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('SECRET_KEY'),
			}),
		}),
	],
	controllers: [AccountController],
	providers: [AccountService, StudentStrategy, SchoolAdminStrategy],
	exports: [AccountService],
})
export class AccountModule {
	constructor(private accountService: AccountService) {
		this.accountService.insertDefaultAccount().then(r => {
			console.log('default account insert');
		});
	}
}
