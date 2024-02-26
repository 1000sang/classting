import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsFeedPresenter {
	constructor(obj: Partial<CreateNewsFeedPresenter>) {
		Object.assign(this, obj);
	}

	@ApiProperty({
		description: '소식 id',
	})
	readonly id: number;
}
