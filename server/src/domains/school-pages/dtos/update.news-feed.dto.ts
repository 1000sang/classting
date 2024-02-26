import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateNewsFeedDto {
	@ApiProperty({
		description: '소식',
	})
	@IsString()
	readonly news: string;
}
