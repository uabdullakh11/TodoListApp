import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Like } from "typeorm";

export const TaskFilter = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const currentDate = new Date().toLocaleDateString("en-US", {hour12: false});
    const setFilter = {
      done: { where: { completed: true }, order: { created_at: "DESC" } },
      undone: { where: { completed: false }, order: { created_at: "DESC" } },
      past: { where: {}, order: { created_at: "ASC" } },
      today: {
        where: {
          date: Like(`${currentDate}%`)
          // date: { [Op.startsWith]: `%${currentDate}` },
        },
        order: { created_at: "DESC" },
      },
    };
    const request = ctx.switchToHttp().getRequest();

    return (
      setFilter[request.query.filter] || {
        where: {},
        order: { created_at: "DESC" },
      }
    );
  }
);
