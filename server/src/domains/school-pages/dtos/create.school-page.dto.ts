/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateSchoolPageDto {
	@ApiProperty({
		description: '지역',
	})
	@IsString()
	readonly region: string;

	@ApiProperty({
		description: '학교명',
	})
	@IsString()
	readonly schoolName: string;
}
