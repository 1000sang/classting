import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class SignupDto {
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

	@ApiProperty({
		description: '학생여부',
	})
	@IsBoolean()
	readonly isStudent: boolean;
}
