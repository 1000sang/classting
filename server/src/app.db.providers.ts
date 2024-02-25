/* istanbul ignore file */
import { DatabaseProvide } from './consts';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './config';
// import { UserEntity } from './entities';
import { DataSource } from 'typeorm';

export const databaseProviders = [
	{
		provide: DatabaseProvide,
		imports: [],
		inject: [ConfigService],
		useFactory: async (configService: ConfigService) => {
			const dbConfig = configService.get<DatabaseConfig>('db');

			const dataSource = new DataSource({
				type: 'postgres',
				host: dbConfig?.host,
				port: dbConfig?.port,
				username: dbConfig?.username,
				password: dbConfig?.password,
				database: dbConfig?.databaseName,
				entities: [],
				logging: ['error'],
				// logger: new WinstonAdaptor(logger, ['error']),
			});

			return dataSource.initialize();
		},
	},
];
