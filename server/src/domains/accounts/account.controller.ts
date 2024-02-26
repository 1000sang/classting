import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { LoginDto } from './dtos/login.dto';
import { LoginPresenter } from './presenters/login.presenter';

@Controller('/account')
@ApiTags('account api')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post('login')
	@ApiOperation({ summary: '로그인' })
	@ApiBody({ type: LoginDto })
	@ApiCreatedResponse({
		description: '로그인 응답',
		type: LoginPresenter,
	})
	async login(@Body() dto: LoginDto) {
		return this.accountService.login(dto);
	}
}
