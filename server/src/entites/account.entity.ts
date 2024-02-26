import { Column, Entity } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Exclude } from 'class-transformer';

@Entity({
	name: 'ACCOUNT',
})
export class Account extends CommonEntity {
	@Column()
	email: string;

	@Column()
	@Exclude()
	password: string;

	@Column()
	isStudent: boolean;
}
