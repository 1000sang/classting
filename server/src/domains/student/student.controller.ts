import { Controller, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubscribeSchoolPagePresenter } from './presenters/subscribe.school-page.presenter';
import { StudentService } from './student.service';

@ApiBearerAuth()
@Controller('/student')
@ApiTags('학생 api')
export class StudentController {
	constructor(private readonly studentService: StudentService) {}

	@Post('/sub/school-page/:id')
	@ApiOperation({ summary: '학교 페이지 구독' })
	@ApiCreatedResponse({
		description: '학교 페이지 구독 응답',
		type: SubscribeSchoolPagePresenter,
	})
	async subscribe(@Param('id') id: string) {
		const params = { id: Number(id) };
		return await this.studentService.subscribe(params);
	}
}
