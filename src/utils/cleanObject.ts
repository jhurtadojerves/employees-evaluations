export const cleanObject = <T extends object>(obj: T): Partial<T> =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null)) as Partial<T>;
