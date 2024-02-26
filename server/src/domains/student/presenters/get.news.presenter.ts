import { ApiProperty } from '@nestjs/swagger';

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
}
