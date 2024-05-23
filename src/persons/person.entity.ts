import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    first_name: string;

    @Column({ nullable: true })
    last_name: string;

    @Column({ nullable: true })
    date_of_birth: Date;
    
    @Column({ nullable: true })
    gender: string;
    
    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phone_number: string;

    @Column({ nullable: true })
    relationship: string;

}
