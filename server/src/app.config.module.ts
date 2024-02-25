/* istanbul ignore file */
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigType } from './config';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as yaml from 'js-yaml';
import * as process from 'process';
import { NotFoundEnvironmentException } from './exceptions';

const processLoadYamlFile = () => {
	const config = yaml.load(readFileSync(join(__dirname, '..', `.env.yaml`), 'utf8')) as ConfigType;

	return {
		...config,
	} as ConfigType;
};

const loadConfig = async (): Promise<ConfigType> => {
	let configType: ConfigType;

	console.log(process.env.ENV);
	if (!process.env.ENV) {
		throw new NotFoundEnvironmentException('ENV 환경변수를 찾을 수 없습니다');
	}

	configType = processLoadYamlFile();

	return configType;
};

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [
				async () => {
					return loadConfig();
				},
			],
		}),
	],
	controllers: [],
	providers: [],
})
export class AppConfigModule {}
