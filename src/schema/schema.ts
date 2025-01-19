import zod from 'zod';

export const UserSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(8),
  phoneNo: zod.string().length(10),
});

export const UpdateUserSchema = zod.object({
  name: zod.string().optional(),
  email: zod.string().email().optional(),
  password: zod.string().min(8).optional(),
  phoneNo: zod.string().length(10).optional(),
});

export const AdminSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  username: zod.string().min(8).max(20),
  password: zod.string().min(8),
});