import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolPagePresenter {
	constructor(obj: Partial<CreateSchoolPagePresenter>) {
		Object.assign(this, obj);
	}
}
