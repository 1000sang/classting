import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Exclude } from 'class-transformer';
import { SchoolPageEntity } from './school-page.entity';

@Entity({
	name: 'NEW_SPEED',
})
export class NewSpeedEntity extends CommonEntity {
	@Column()
	news: string;

	@ManyToOne(() => SchoolPageEntity, schoolPage => schoolPage.id)
	schoolPage: SchoolPageEntity;
}
