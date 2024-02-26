import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteNewsFeedDto {
	@ApiProperty({
		description: '소식 id',
	})
	@IsString()
	readonly id: string;
}
