import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Like } from "typeorm";

export const TaskFilter = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const currentDate = new Date().toLocaleDateString("en-US", {hour12: false});
    const setFilter = {
      done: { where: { completed: true }, order: { createdAt: "DESC" } },
      undone: { where: { completed: false }, order: { createdAt: "DESC" } },
      past: { where: {}, order: { createdAt: "ASC" } },
      today: {
        where: {
          date: Like(`${currentDate}%`)
          // date: { [Op.startsWith]: `%${currentDate}` },
        },
        order: { createdAt: "DESC" },
      },
    };
    const request = ctx.switchToHttp().getRequest();

    return (
      setFilter[request.query.filter] || {
        where: {},
        order: { createdAt: "DESC" },
      }
    );
  }
);
