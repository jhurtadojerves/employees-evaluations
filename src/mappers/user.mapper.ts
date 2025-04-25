import { UserDTO, UserDTOSchema } from '#dtos/user.dto';

export const toUserDTO = (user: any): UserDTO => {
  return UserDTOSchema.parse(user.toObject());
};

export const toUserListDTO = (employees: any[]): UserDTO[] =>
  UserDTOSchema.array().parse(employees.map((e) => e.toObject()));
