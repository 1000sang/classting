/* istanbul ignore file */
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Exclude } from 'class-transformer';
import { SchoolPageEntity } from './school-page.entity';

@Entity({
	name: 'ACCOUNT',
})
export class AccountEntity extends CommonEntity {
	@Column()
	email: string;

	@Column()
	@Exclude()
	password: string;

	@Column()
	isStudent: boolean;

	@ManyToMany(() => SchoolPageEntity)
	@JoinTable({
		name: 'SUB',
	})
	schoolPages: SchoolPageEntity[];
}
