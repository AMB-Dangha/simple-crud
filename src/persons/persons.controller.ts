import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from "@nestjs/common";
import { PersonsService } from "./persons.service";
import { CreatePersonDto } from "./dto/create-person.dto";
import { Person } from "./interfaces/person.interface";
import { JwtAuthGuard } from "src/users/jwt-auth.guard";


@UseGuards(JwtAuthGuard)
@Controller('persons')
export class PersonsController {
    constructor(private personsService: PersonsService) {}

    @Get()
    async findAll(): Promise<Person[]> {
        return this.personsService.findAll();
      }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Person | undefined> {
        return this.personsService.findOne(+id);
    }

    @Post()
    async create(@Body() createPersonDto: CreatePersonDto) {
        this.personsService.create(createPersonDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() person: Person): Promise<Person | undefined> {
        return this.personsService.update(+id, person);
    }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.personsService.remove(+id);
  }

}