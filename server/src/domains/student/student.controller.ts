import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubscribeSchoolPagePresenter } from './presenters/subscribe.school-page.presenter';
import { StudentService } from './student.service';
import { StudentGuard } from '../accounts/passport/guards/student.guard';
import { CurrentAccount } from '../../decorators/account.decorator';

@ApiBearerAuth()
@Controller('/student')
@ApiTags('학생 api')
export class StudentController {
	constructor(private readonly studentService: StudentService) {}

	@Post('/sub/school-page/:id')
	@UseGuards(StudentGuard)
	@ApiOperation({ summary: '학교 페이지 구독' })
	@ApiCreatedResponse({
		description: '학교 페이지 구독 응답',
		type: SubscribeSchoolPagePresenter,
	})
	async subscribe(@Param('id') id: string, @CurrentAccount() account) {
		const params = { schoolPageId: Number(id), accountId: account.id };
		return await this.studentService.subscribe(params);
	}
}
