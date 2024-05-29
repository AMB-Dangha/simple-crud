import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreatePersonDto {
    @IsString({ message: 'First name must be a string' })
    @IsNotEmpty({ message: 'First name is required' })
    firstName: string;

    @IsString({ message: 'Last name must be a string' })
    @IsNotEmpty({ message: 'Last name is required' })
    lastName: string;

    @IsDateString({}, { message: 'Date of birth must be a valid date' })
    dateOfBirth: Date;

    @IsString({ message: 'Gender must be a string' })
    //   @IsNotEmpty({ message: 'Gender is required' })
    gender: string;

    @IsString({ message: 'Address must be a string' })
    //   @IsNotEmpty({ message: 'Address is required' })
    address: string;

    @IsString({ message: 'Email must be a string' })
    //   @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString({ message: 'Phone number must be a string' })
    //   @IsNotEmpty({ message: 'Phone number is required' })
    phoneNumber: string;

    @IsString({ message: 'Relationship must be a string' })
    //   @IsNotEmpty({ message: 'Relationship is required' })
    relationship: string;
}