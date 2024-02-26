import { ApiProperty } from '@nestjs/swagger';

class SchoolPage {
	constructor(obj: Partial<SchoolPage>) {
		Object.assign(this, obj);
	}

	@ApiProperty({
		description: '지역',
	})
	readonly region: string;

	@ApiProperty({
		description: '학교 명',
	})
	readonly schoolName: string;
}

export class GetNewsPresenter {
	constructor(obj: Partial<GetNewsPresenter>) {
		Object.assign(this, obj);
	}

	@ApiProperty({
		description: '학교 소식 id',
	})
	readonly id: number;

	@ApiProperty({
		description: '생성일',
	})
	readonly createdAt: Date;

	@ApiProperty({
		description: '소식',
	})
	readonly news: string;

	@ApiProperty({
		description: '학교 정보',
		type: SchoolPage,
	})
	readonly schoolPage: SchoolPage;
}
