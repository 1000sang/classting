import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SchoolPageService } from './school-page.service';
import { CreateSchoolPageDto } from './dtos/create.school-page.dto';
import { CreateSchoolPagePresenter } from './presenters/create.school-page.presenter';
import { CreateNewSpeedDto } from './dtos/create.new-speed.dto';
import { CreateNewSpeedPresenter } from './presenters/create.new-speed.presenter';
import { DeleteNewSpeedDto } from './dtos/delete.new-speed.dto';
import { UpdateNewSpeedDto } from './dtos/update.new-speed.dto';

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

	@Post('/new-speed/:id/')
	@ApiOperation({ summary: '소식 작성' })
	@ApiBody({ type: CreateNewSpeedDto })
	@ApiCreatedResponse({
		description: '소식 생성 응답',
		type: CreateNewSpeedPresenter,
	})
	async createNews(@Body() body: CreateNewSpeedDto, @Param('id') id: string) {
		const params = {
			news: body.news,
			id,
		};
		return await this.schoolPageService.createNews(params);
	}

	@Delete('/new-speed/:id')
	@ApiOperation({ summary: '소식 삭제' })
	async deleteNews(@Param('id') id: string) {
		return await this.schoolPageService.deleteNews(id);
	}

	@Patch('/new-speed/:id')
	@ApiOperation({ summary: '소식 수정' })
	async updateNews(@Body() body: UpdateNewSpeedDto, @Param('id') id: string) {
		const params = {
			id: Number(id),
			news: body.news,
		};
		return await this.schoolPageService.updateNews(params);
	}
}