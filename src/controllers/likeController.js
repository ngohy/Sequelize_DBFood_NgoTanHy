//Xử lý like nhà hàng (like, unlike, lấy danh sách like theo nhà hàng và
//user)
const sequelize = require("../models/index");
const initModels = require("../models/init-models");
const { successCode, failCode, errorCode } = require("../ultis/response");
const model = initModels(sequelize);

const getLikeByUser = async (req, res) => {
  try {
    let { id } = req.params;
    let result = await model.like_res.findAll({
      where: { user_id: id },
    });
    if (result.length === 0) {
      failCode(res, id, "không tồn tại user_id");
      return;
    }
    successCode(res, result, "Lấy danh sách thành công");
  } catch (err) {
    res.status(400).send(err);
  }
};

const getLikeByRes = async (req, res) => {
  try {
    let { id } = req.params;
    let result = await model.like_res.findAll({
      where: { res_id: id },
    });
    if (result.length === 0) {
      failCode(res, id, "không tồn tại res_id");
      return;
    }
    successCode(res, result, "Lấy danh sách thành công");
  } catch (err) {
    res.status(400).send(err);
  }
};

const postLike = async (req, res) => {
  try {
    let { user_id, res_id, date_like } = req.body;
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
    let newLike = { user_id, res_id, date_like };
    let result = await model.like_res.create(newLike);
    successCode(res, result, "Thêm like thành công");
  } catch (err) {
    errorCode(res, err.errors);
  }
};

const deleteLike = async (req, res) => {
  try {
    let { user_id, res_id } = req.body;
    let checkUser = await model.like_res.findByPk(user_id);

    // let checkRes = await model.like_res.findByPk(res_id);
    let checkRes = await model.like_res.findAll({
      where: { user_id, res_id },
    });

    if (!checkUser) {
      failCode(res, user_id, "user_id không tồn tại");
      return;
    }
    if (checkRes.length === 0) {
      failCode(res, res_id, "res_id không tồn tại");
      return;
    }
    let result = await model.like_res.destroy({
      where: { user_id, res_id },
    });

    successCode(res, { user_id, res_id }, "Xóa like thành công");
  } catch (err) {
    errorCode(res, err.errors);
  }
};

module.exports = { getLikeByUser, getLikeByRes, postLike, deleteLike };
