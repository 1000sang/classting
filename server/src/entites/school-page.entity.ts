import { Column, Entity, JoinColumn, OneToMany, Unique } from 'typeorm';
import { CommonEntity } from './common.entity';
import { NewsFeedEntity } from './news-feed.entity';

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
	newSpeed: NewsFeedEntity[];
}
