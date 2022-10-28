const sequelize = require("../models/index");
const initModels = require("../models/init-models");
const { successCode, failCode, errorCode } = require("../ultis/response");

const model = initModels(sequelize);

const postOrder = async (req, res) => {
  try {
    let { user_id, food_id, amount, code, arr_sub_id } = req.body;
    let newOrder = { user_id, food_id, amount, code, arr_sub_id };
    let checkUser = await model.user.findByPk(user_id);
    let checkFood = await model.food.findByPk(food_id);
    if (!checkUser) {
      failCode(res, user_id, "user_id không tồn tại");
    }
    if (!checkFood) {
      failCode(res, food_id, "food_id không tồn tại");
    }
    let result = await model.order.create(newOrder);
    successCode(res, result, "Thêm món thành công");
  } catch (err) {
    errorCode(res, err.errors);
  }
};

module.exports = { postOrder };
