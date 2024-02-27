/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';

export class LoginPresenter {
	constructor(obj: Partial<LoginPresenter>) {
		Object.assign(this, obj);
	}

	@ApiProperty({
		description: '토큰',
	})
	readonly token: string;
}
