import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './app.config.module';
import { AppDbModule } from './app.db.module';

@Module({
	imports: [AppConfigModule, AppDbModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
