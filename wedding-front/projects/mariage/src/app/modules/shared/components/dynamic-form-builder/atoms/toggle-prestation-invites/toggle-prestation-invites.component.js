"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var field_type_enum_1 = require("../../models/field-type.enum");
var TogglePrestationInvitesComponent = /** @class */ (function () {
    function TogglePrestationInvitesComponent() {
        this.fieldTypeEnum = field_type_enum_1.FieldTypeEnum;
        this.displayItemsLimit = 4;
        this.showMoreOptions = false;
        this.color = 'primary';
        this.addBtnLabel = 'Ajouter';
        this.showMoreLabel = 'Afficher plus de critères';
        this.addOption = new core_1.EventEmitter();
    }
    TogglePrestationInvitesComponent.prototype.ngOnInit = function () {
    };
    TogglePrestationInvitesComponent.prototype.toggle = function (checked) {
        this.field.value = checked;
    };
    __decorate([
        core_1.Input()
    ], TogglePrestationInvitesComponent.prototype, "field", void 0);
    __decorate([
        core_1.Input()
    ], TogglePrestationInvitesComponent.prototype, "form", void 0);
    __decorate([
        core_1.Output()
    ], TogglePrestationInvitesComponent.prototype, "addOption", void 0);
    TogglePrestationInvitesComponent = __decorate([
        core_1.Component({
            selector: 'app-toggle-prestation-invites',
            templateUrl: './toggle-prestation-invites.component.html',
            styleUrls: ['./toggle-prestation-invites.component.scss']
        })
    ], TogglePrestationInvitesComponent);
    return TogglePrestationInvitesComponent;
}());
exports.TogglePrestationInvitesComponent = TogglePrestationInvitesComponent;
