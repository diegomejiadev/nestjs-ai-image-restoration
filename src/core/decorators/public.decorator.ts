import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from 'src/shared/constants/global.cst';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
