import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNewsFeedDto {
	@ApiProperty({
		description: '소식',
	})
	@IsString()
	readonly news: string;
}
