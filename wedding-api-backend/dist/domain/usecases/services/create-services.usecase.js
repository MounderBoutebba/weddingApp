"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_exceptions_1 = require("../../exceptions/service.exceptions");
class CreateServices {
    constructor(servicesServices) {
        this.servicesServices = servicesServices;
    }
    async createService(service) {
        const query = service.userid;
        let createService;
        try {
            const searchServiceLabelByUserId = await this.servicesServices.searchServicesByFileds(service.label, query, ['userid']);
            if (searchServiceLabelByUserId.length > 0) {
                throw new service_exceptions_1.ServiceException('service already exist for user');
            }
        }
        catch (err) {
            if (err instanceof service_exceptions_1.ServiceException) {
                throw new service_exceptions_1.ServiceException('service alerady exist for user');
            }
            else {
                createService = await this.servicesServices.createService(service);
            }
        }
        createService = await this.servicesServices.createService(service);
        return createService;
    }
}
exports.CreateServices = CreateServices;
//# sourceMappingURL=create-services.usecase.js.map