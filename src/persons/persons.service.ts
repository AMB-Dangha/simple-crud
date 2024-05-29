import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './person.entity';
import { CreatePersonDto } from './dto/create-person.dto';


@Injectable()
export class PersonsService {
    constructor(
        @InjectRepository(Person)
        private personRespository: Repository<Person>,
    ) { }

    async findAll(): Promise<Person[]> {
        return this.personRespository.find();
    }

    async findOne(id: number): Promise<Person | null> {
        return this.personRespository.findOneBy({ id });
    }

    async create(createPersonDto: CreatePersonDto): Promise<Person> {
        const newPerson = this.personRespository.create(createPersonDto);
        return await this.personRespository.save(newPerson);
    }

    async update(id: number, updatedPerson: Person): Promise<Person | undefined> {
        const existingPerson = await this.personRespository.findOneBy({ id });
        if (!existingPerson) {
            throw new NotFoundException(`Person with ID ${id} not found`);
        }

        Object.assign(existingPerson, updatedPerson);

        // Save the updated person to the database
        return await this.personRespository.save(existingPerson);
    }

    async remove(id: number): Promise<Person | null> {
        const person = await this.personRespository
            .createQueryBuilder()
            .where("id = :id", { id })
            .getOne();

        if (!person) {
            return null
        }

        await this.personRespository.remove(person);
        return person
    }



}