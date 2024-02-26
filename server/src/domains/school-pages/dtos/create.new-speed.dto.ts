import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNewSpeedDto {
	@ApiProperty({
		description: '소식',
	})
	@IsString()
	readonly news: string;
}
