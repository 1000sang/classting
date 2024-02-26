import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
	@ApiProperty({
		description: 'email',
		default: 'student1@gmail.com',
	})
	@IsEmail()
	readonly email: string;

	@ApiProperty({
		description: '비밀번호',
		default: '1234',
	})
	@IsString()
	readonly password: string;
}
