export interface CreatePersonDto {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    address: string;
    email: string;
    phoneNumber: string;
    relationship: string;
}