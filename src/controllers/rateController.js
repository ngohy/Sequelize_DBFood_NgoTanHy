const sequelize = require("../models/index");
const initModels = require("../models/init-models");
const { successCode, failCode, errorCode } = require("../ultis/response");
const model = initModels(sequelize);

//get rate from user_id
const getRateByUser = async (req, res) => {
  try {
    let { id } = req.params;
    let result = await model.rate_res.findAll({ where: { user_id: id } });

    if (result.length === 0) {
      failCode(res, id, "không tồn tại user_id");
      return;
    }
    successCode(res, result, "Lấy danh sách thành công");
  } catch (err) {
    res.status(400).send(err);
  }
};

//get rate from res_id
const getRateByRes = async (req, res) => {
  try {
    let { id } = req.params;
    let result = await model.rate_res.findAll({ where: { res_id: id } });
    if (result.length === 0) {
      failCode(res, id, "không tồn tại res_id");
      return;
    }
    successCode(res, result, "Lấy danh sách thành công");
  } catch (err) {
    res.status(400).send(err);
  }
};

//add rate (post)
const postRate = async (req, res) => {
  try {
    let { user_id, res_id, amount, date_rate } = req.body;
    let checkUser = await model.user.findByPk(user_id);
    let checkRes = await model.restaurant.findByPk(res_id);
    if (!checkUser) {
      failCode(res, user_id, "user_id không tồn tại");
      return;
    }
    if (!checkRes) {
      failCode(res, res_id, "res_id không tồn tại");
      return;
    }
    let newRate = {
      user_id,
      res_id,
      amount,
      date_rate,
    };
    let result = await model.rate_res.create(newRate);
    successCode(res, result, "Thêm đánh giá thành công");
  } catch (err) {
    errorCode(res, err.errors);
  }
};

module.exports = { postRate, getRateByUser, getRateByRes };
