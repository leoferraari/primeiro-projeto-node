import { Request, Response } from "express";

import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from "@modules/appointments/services/ListProviderMonthAvailabilityService";


export default class ListProviderMonthAvailabilityController {

  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.params.provider_id;
    const { month, year } = request.body;

    const listProviderMonthAvailabilityService = container.resolve(ListProviderMonthAvailabilityService);

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id,
      month,
      year
    });

    return response.json(availability);
  }
}
