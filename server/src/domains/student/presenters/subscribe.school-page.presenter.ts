/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';

export class SubscribeSchoolPagePresenter {
	constructor(obj: Partial<SubscribeSchoolPagePresenter>) {
		Object.assign(this, obj);
	}

	@ApiProperty({
		description: '학교 페이지 id',
	})
	readonly id: number;
}
