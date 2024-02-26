import { ApiProperty } from '@nestjs/swagger';

export class GetSchoolPageListPresenter {
	constructor(obj: Partial<GetSchoolPageListPresenter>) {
		Object.assign(this, obj);
	}

	@ApiProperty({
		description: '학교 페이지 id',
	})
	readonly id: number;

	@ApiProperty({
		description: '지역',
	})
	readonly region: string;

	@ApiProperty({
		description: '학교명',
	})
	readonly schoolName: string;
}
