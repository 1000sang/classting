import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteNewSpeedDto {
	@ApiProperty({
		description: '소식 id',
	})
	@IsString()
	readonly id: string;
}
