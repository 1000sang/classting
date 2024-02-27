/* istanbul ignore file */
import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Exclude } from 'class-transformer';
import { SchoolPageEntity } from './school-page.entity';
import { AccountEntity } from './account.entity';
import { Account } from 'aws-sdk';
import { NewsFeedEntity } from './news-feed.entity';

@Entity({
	name: 'STUDENT_NEWS',
})
@Index(['accountId'])
export class StudentNewsEntity {
	@PrimaryGeneratedColumn()
	id: number;

	// @ManyToOne(() => AccountEntity, account => account.id)
	// accountId: number;
	//
	// @ManyToOne(() => SchoolPageEntity, schoolPage => schoolPage.id)
	// schoolPageId: number;
	//
	// @ManyToOne(() => NewsFeedEntity, newsFeed => newsFeed.id)
	// newsFeedId: number;
	@Column()
	accountId: number;

	@Column()
	schoolPageId: number;

	@Column()
	newsFeedId: number;
}
