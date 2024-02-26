import { ApiProperty } from '@nestjs/swagger';

export class CreateNewSpeedPresenter {
	constructor(obj: Partial<CreateNewSpeedPresenter>) {
		Object.assign(this, obj);
	}

	@ApiProperty({
		description: '소식 id',
	})
	readonly id: number;
}
