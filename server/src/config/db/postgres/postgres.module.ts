import { Module } from '@nestjs/common';
import { PostgresConfigService } from './postgres.service';

@Module({
	providers: [PostgresConfigService],
})
export class PostgresConfigModule {}
