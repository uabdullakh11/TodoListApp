import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = await ctx.switchToHttp().getRequest();
    const user = await request.user
    return await user.id;
  },
);