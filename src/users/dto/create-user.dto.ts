export interface CreateUserDto {
    id: number,
    username: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}