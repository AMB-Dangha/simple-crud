import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './person.entity';


@Injectable()
export class PersonsService {
    constructor(
        @InjectRepository(Person)
        private personRespository: Repository<Person>,
    ) {}

    async findAll(): Promise<Person[]> {
        return this.personRespository.find();
    }

    async findOne(id: number): Promise<Person | null> {
        return this.personRespository.findOneBy({ id });
    }

    async create(person: Person) {
        this.personRespository.save(person);
    }

    async update(id: number, person: Person): Promise<Person> {
        return this.personRespository.save(person);
    }

    async remove(id: number): Promise<void> {
        await this.personRespository.delete(id);
    }



}