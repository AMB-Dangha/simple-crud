import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards, NotFoundException, Res, ParseIntPipe, HttpStatus } from "@nestjs/common";
import { PersonsService } from "./persons.service";
import { CreatePersonDto } from "./dto/create-person.dto";
import { Person } from "./interfaces/person.interface";
import { JwtAuthGuard } from "src/users/jwt-auth.guard";
import { Response } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('persons')
export class PersonsController {
    constructor(private personsService: PersonsService) {}

    @Get()
    async findAll(): Promise<Person[]> {
        return this.personsService.findAll();
      }

    @Get(':id')
    async findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number): Promise<Person | undefined> {
        const person = await this.personsService.findOne(+id);
        if (!person) {
          throw new NotFoundException(`Person with ID ${id} not found`);
        }
        return person;
    
    }

    @Post()
    async create(@Body() createPersonDto: CreatePersonDto): Promise<{message: string; data: Person }> {
        const createdPerson = await this.personsService.create(createPersonDto)
        return {
          message: 'Person created successfully',
          data: createdPerson,
        }
    }

    @Put(':id')
    async update(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: string, @Body() person: Person): Promise<Person | undefined> {
        return this.personsService.update(+id, person);
    }

    @Delete(':id')
    async remove(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: string , @Res() res: Response): Promise<void> {
      const person = await this.personsService.remove(+id);
      if (!person) {
        throw new NotFoundException(`Person with ID ${id} not found`);
      }
      res.status(200).json({ message: `Person with ID ${id} deleted successfully` })
    }

}