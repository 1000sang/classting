import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SchoolPageService } from './school-page.service';
import { CreateSchoolPageDto } from './dtos/create.school-page.dto';
import { CreateSchoolPagePresenter } from './presenters/create.school-page.presenter';

@ApiBearerAuth()
@Controller('/school-page')
@ApiTags('학교페이지 api')
export class SchoolPageController {
	constructor(private readonly schoolPageService: SchoolPageService) {}

	@Post()
	@ApiOperation({ summary: '학교 페이지 생성' })
	@ApiBody({ type: CreateSchoolPageDto })
	@ApiCreatedResponse({
		description: '학교 페이지 생성 응답',
		type: CreateSchoolPagePresenter,
	})
	async create(@Body() dto: CreateSchoolPageDto) {
		return await this.schoolPageService.create(dto);
	}
}
