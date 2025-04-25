import { ListInput, ListResponse } from '#types/common.type';

export interface BaseService<
  CreateInput = any,
  UpdateInput = any,
  UpdateOutput = any,
  GetOutput = any,
  CreateOutput = any,
> {
  get?(id: string): Promise<GetOutput>;
  create?(input: CreateInput): Promise<CreateOutput>;
  update?(id: string, input: UpdateInput): Promise<UpdateOutput>;
  list?(input: ListInput): Promise<ListResponse>;
}
