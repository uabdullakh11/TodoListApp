import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Task = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.userId;
  },
);

export const TaskFilter = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const setFilter = {
      done: { where: { completed: true }, order: [["createdAt", "DESC"]] },
      undone: { where: { completed: false }, order: [["createdAt", "DESC"]] },
      past: { where: {}, order: [["createdAt", "ASC"]] },
      today: {
        where: {
          // date: { [Op.startsWith]: `%${currentDate}` },
        },
        order: [["createdAt", "DESC"]],
      },
    };
    const request = ctx.switchToHttp().getRequest();
    
    return (
      setFilter[request.query.filter] || {
        where: {},
        order: [["createdAt", "DESC"]],
      }
    );
  },
)