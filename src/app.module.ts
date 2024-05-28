import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Person } from './persons/person.entity';
import { PersonsModule } from './persons/person.module';
import { AuthModule } from './users/auth.module';
import { User } from './users/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './validation.pipe';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Person, User],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    PersonsModule],
  controllers: [AppController],
  providers: [
    AppService,
      {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  exports: [TypeOrmModule]
})
export class AppModule {}
