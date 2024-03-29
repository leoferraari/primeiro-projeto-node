"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classTransformer = require("class-transformer");
var _tsyringe = require("tsyringe");
var _UpdateUserAvatarService = _interopRequireDefault(require("../../../services/UpdateUserAvatarService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UserAvatarController {
  async update(request, response) {
    const updateUserAvatar = _tsyringe.container.resolve(_UpdateUserAvatarService.default);
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    });
    return response.json({
      user: (0, _classTransformer.instanceToPlain)(user)
    });
  }
}
exports.default = UserAvatarController;