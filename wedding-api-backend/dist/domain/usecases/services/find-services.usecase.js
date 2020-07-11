"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_exceptions_1 = require("../../../domain/exceptions/service.exceptions");
class FindServices {
    constructor(providerService) {
        this.providerService = providerService;
    }
    findServices() {
        return this.providerService.findServices();
    }
    findServicesByCategorie(categorie) {
        return this.providerService.findServicesByCategorie(categorie);
    }
    async searchServices(index, type, queryService) {
        return await this.providerService.searchServices(index, type, queryService);
    }
    async searchServicesByFileds(index, type, queryService, fileds) {
        return await this.providerService.searchServicesByFileds(index, type, queryService, fileds);
    }
    async deleteServicesByUserId(index, type, id) {
        try {
            return await this.providerService.deleteServicesByIndexId(index, type, id);
        }
        catch (err) {
            throw new service_exceptions_1.ServiceException('service not found for user');
        }
    }
    async updateServicesByUserId(index, type, id, categorie) {
        try {
            return await this.providerService.updateServiceByIndexId(index, type, id, categorie);
        }
        catch (e) {
            throw new service_exceptions_1.ServiceException(e.message);
        }
    }
    async searchQuery(type, query, page = 0) {
        try {
            return await this.providerService.searchByQuery(type, query, page);
        }
        catch (e) {
            throw new service_exceptions_1.ServiceException(e.message);
        }
    }
}
exports.FindServices = FindServices;
//# sourceMappingURL=find-services.usecase.js.map