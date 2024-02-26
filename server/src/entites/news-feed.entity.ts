import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, Unique } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Exclude } from 'class-transformer';
import { SchoolPageEntity } from './school-page.entity';
import { AccountEntity } from './account.entity';

@Entity({
	name: 'NEW_SPEED',
})
export class NewsFeedEntity extends CommonEntity {
	@Column()
	news: string;

	@ManyToOne(() => SchoolPageEntity, schoolPage => schoolPage.id)
	schoolPage: SchoolPageEntity;

	@ManyToMany(() => AccountEntity)
	@JoinTable({
		name: 'SUB',
	})
	accounts: AccountEntity[];
}
