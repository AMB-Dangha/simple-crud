export interface CreateUserDto {
    id: number;
    first_name: string,
    last_name: string,
    date_of_birth: Date,
    gender: string,
    address: string,
    email: string,
    phone_number: string,
    relationship: string,
}