import { Column, Entity, JoinColumn, OneToMany, Unique } from 'typeorm';
import { CommonEntity } from './common.entity';
import { NewSpeedEntity } from './new-speed.entity';

@Entity({
	name: 'SCHOOL_PAGE',
})
@Unique(['region', 'schoolName'])
export class SchoolPageEntity extends CommonEntity {
	@Column()
	region: string;

	@Column()
	schoolName: string;

	@OneToMany(type => NewSpeedEntity, newSpeed => newSpeed.id)
	newSpeed: NewSpeedEntity[];
}
