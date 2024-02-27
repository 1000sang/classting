/* istanbul ignore file */
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, Unique } from 'typeorm';
import { CommonEntity } from './common.entity';
import { NewsFeedEntity } from './news-feed.entity';
import { AccountEntity } from './account.entity';

@Entity({
	name: 'SCHOOL_PAGE',
})
@Unique(['region', 'schoolName'])
export class SchoolPageEntity extends CommonEntity {
	@Column()
	region: string;

	@Column()
	schoolName: string;

	@OneToMany(type => NewsFeedEntity, newSpeed => newSpeed.id)
	newsFeed: NewsFeedEntity[];

	@ManyToMany(() => AccountEntity)
	@JoinTable({
		name: 'SUB',
	})
	accounts: AccountEntity[];
}
