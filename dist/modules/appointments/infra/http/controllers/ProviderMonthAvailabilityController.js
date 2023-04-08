"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _ListProviderMonthAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderMonthAvailabilityService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ListProviderMonthAvailabilityController {
  async index(request, response) {
    const provider_id = request.params.provider_id;
    const {
      month,
      year
    } = request.body;
    const listProviderMonthAvailabilityService = _tsyringe.container.resolve(_ListProviderMonthAvailabilityService.default);
    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id,
      month,
      year
    });
    return response.json(availability);
  }
}
exports.default = ListProviderMonthAvailabilityController;