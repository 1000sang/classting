import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolPagePresenter {
	constructor(obj: Partial<CreateSchoolPagePresenter>) {
		Object.assign(this, obj);
	}

	@ApiProperty({
		description: '학교 페이지 id',
	})
	readonly id: number;
}
