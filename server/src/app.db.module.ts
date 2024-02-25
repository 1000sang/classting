/* istanbul ignore file */
import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './app.db.providers';

@Global()
@Module({
	providers: [...databaseProviders],
	exports: [...databaseProviders],
})
export class AppDbModule {}
