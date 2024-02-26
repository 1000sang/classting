import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
	@ApiProperty({
		description: 'email',
	})
	@IsEmail()
	readonly email: string;

	@ApiProperty({
		description: '비밀번호',
	})
	@IsString()
	readonly password: string;
}
