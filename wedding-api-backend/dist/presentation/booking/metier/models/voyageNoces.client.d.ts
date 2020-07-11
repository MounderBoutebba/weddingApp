export interface IVoyageNocesClient {
    duree: number;
    zoneGeo: string[];
    situationGeo: string[];
    classificationHoteliere: number;
    childrens: boolean;
    animals: boolean;
    equipements: string[];
    services: string[];
    activities: string[];
    parking: boolean;
    nombreDeChambre: number;
    typeDeTarification: ItarificationType;
}
export interface ItarificationType {
    label: string;
    step: number;
    value: number;
    unit: string;
}
