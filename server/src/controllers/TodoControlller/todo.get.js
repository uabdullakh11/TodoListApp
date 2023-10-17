import { TodoService } from "../../services/index.js";
import { chooseFilter } from "../../utils/chooseFilter.js";
const getTodos = async (req, res, next) => {
  const id = req.userId;
  try {
    const todos = await TodoService.getTodos({
      id,
      page: req.query.page,
      filter: chooseFilter(req.query.filter),
      search: req.query.search,
    });
    res.json(todos);
  } catch (error) {
    next(error);
  }
};
export { getTodos };
