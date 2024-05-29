import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name', nullable: true })
    firstName: string;

    @Column({ name: 'last_name', nullable: true })
    lastName: string;

    @Column({ name: 'date_of_birth', nullable: true })
    dateOfBirth: Date;

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    email: string;

    @Column({ name: 'phone_number', nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    relationship: string;

}
