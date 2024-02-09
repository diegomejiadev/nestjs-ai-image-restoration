import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  NESTJS_PORT: number;

  @IsString()
  DATABASE_USER: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_DB: string;

  @IsNumber()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_URL: string;

  @IsNumber()
  NESTJS_SALT_ROUNDS: number;

  @IsString()
  NESTJS_JWT_SECRET: string;

  @IsString()
  NESTJS_JWT_EXPIRE_TIME: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
