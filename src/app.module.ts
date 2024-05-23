import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Person } from './persons/person.entity';
import { PersonsService } from './persons/persons.service';
import { PersonsController } from './persons/persons.controller';
import { PersonsModule } from './persons/person.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'postgres',
    entities: [Person],
    synchronize: true,
    autoLoadEntities: true,
  }),
  PersonsModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule]
})
export class AppModule {}
