"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _ListProviderDayAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderDayAvailabilityService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ListProviderDayAvailabilityController {
  async index(request, response) {
    const provider_id = request.params.provider_id;
    const {
      day,
      month,
      year
    } = request.body;
    const listProviderDayAvailabilityService = _tsyringe.container.resolve(_ListProviderDayAvailabilityService.default);
    const availability = await listProviderDayAvailabilityService.execute({
      provider_id,
      day,
      month,
      year
    });
    return response.json(availability);
  }
}
exports.default = ListProviderDayAvailabilityController;