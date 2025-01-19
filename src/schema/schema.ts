import zod from 'zod';

export const UserSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6),
  phoneNo: zod.string().length(10),
});

export const AdminSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  username: zod.string().min(6).max(20),
  password: zod.string().min(6),
});