import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubscribeSchoolPagePresenter } from './presenters/subscribe.school-page.presenter';
import { StudentService } from './student.service';
import { StudentGuard } from '../accounts/passport/guards/student.guard';
import { CurrentAccount } from '../../decorators/account.decorator';
import { GetSchoolPageListPresenter } from './presenters/get.school-page.list.presenter';

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

	@Delete('/sub/school-page/:id')
	@UseGuards(StudentGuard)
	@ApiOperation({ summary: '학교 페이지 구독 취소' })
	@ApiCreatedResponse({
		description: '학교 페이지 구독 취소 응답',
		type: SubscribeSchoolPagePresenter,
	})
	async unsubscribe(@Param('id') id: string, @CurrentAccount() account) {
		const params = { schoolPageId: Number(id), accountId: account.id };
		return await this.studentService.unsubscribe(params);
	}

	@Get('/school-page/list')
	@UseGuards(StudentGuard)
	@ApiOperation({ summary: '학교페이지 목록 확인' })
	@ApiCreatedResponse({
		description: '학교 페이지 목록',
		type: Array<GetSchoolPageListPresenter>,
	})
	async getSchoolPage(@CurrentAccount() account) {
		const params = { accountId: account.id };
		return await this.studentService.getSchoolPage(params);
	}
}
