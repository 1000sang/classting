import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubscribeSchoolPagePresenter } from './presenters/subscribe.school-page.presenter';
import { StudentService } from './student.service';
import { StudentGuard } from '../accounts/passport/guards/student.guard';
import { CurrentAccount } from '../../decorators/account.decorator';
import { GetSchoolPageListPresenter } from './presenters/get.school-page.list.presenter';
import { GetNewsPresenter } from './presenters/get.news.presenter';

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

	@Get('/news-feed/page/:id')
	@UseGuards(StudentGuard)
	@ApiOperation({ summary: '해당 학교 페이지의 소식 보기' })
	@ApiCreatedResponse({
		description: '학교 페이지 소식',
		type: Array<GetNewsPresenter>,
	})
	async getNewsFeed(@Param('id') id: string, @CurrentAccount() account) {
		const params = { accountId: account.id, schoolPageId: Number(id) };
		return await this.studentService.getNewsFeed(params);
	}

	@Get('/news-feed/all')
	@UseGuards(StudentGuard)
	@ApiOperation({ summary: '구독중인 모든 학교의 소식 보기' })
	@ApiCreatedResponse({
		description: '학교 페이지 소식',
		type: Array<GetNewsPresenter>,
	})
	async getAllNewsFeed(@CurrentAccount() account) {
		const params = { accountId: account.id };
		return await this.studentService.getAllNewsFeed(params);
	}
}
