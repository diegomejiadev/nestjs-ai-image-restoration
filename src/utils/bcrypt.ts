import bcrypt from 'bcrypt';

export const hashPassword = async (plainPassword: string) => {
  const salt = await bcrypt.genSalt(+process.env.NESTJS_SALT_ROUNDS);

  const hashedPassword = await bcrypt.hash(plainPassword, salt);

  return hashedPassword;
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
