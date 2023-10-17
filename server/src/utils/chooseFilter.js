import getDate from "../helpers/getDate.js";
import { Op } from "sequelize";

const { currentDate } = getDate();

export const chooseFilter = (filter) => {
  const setFilter = {
    done: { where: { completed: true }, order: [["createdAt", "DESC"]] },
    undone: { where: { completed: false }, order: [["createdAt", "DESC"]] },
    past: { where: {}, order: [["createdAt", "ASC"]] },
    today: {
      where: {
        date: { [Op.startsWith]: `%${currentDate}` },
      },
      order: [["createdAt", "DESC"]],
    },
  };
  return (
    setFilter[filter] || {
      where: {},
      order: [["createdAt", "DESC"]],
    }
  );
};
