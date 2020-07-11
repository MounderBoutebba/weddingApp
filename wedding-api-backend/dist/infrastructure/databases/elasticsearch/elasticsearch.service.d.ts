import * as elasticsearch from 'elasticsearch';
export declare class ElasticsearchService {
    private readonly esclient;
    constructor();
    bulkInsert(index: string, type: string, dataToStore: any): Promise<any>;
    searchIndex(indexP: string, typeP: string, qP: string): Promise<{
        _index: string;
        _type: string;
        _id: string;
        _score: number;
        _source: unknown;
        _version?: number;
        _explanation?: elasticsearch.Explanation;
        fields?: any;
        highlight?: any;
        inner_hits?: any;
        matched_queries?: string[];
        sort?: string[];
    }[]>;
    searchIndexByFileds(indexP: string, typeP: string, qP: string, fieldsP: string[]): Promise<{
        _index: string;
        _type: string;
        _id: string;
        _score: number;
        _source: unknown;
        _version?: number;
        _explanation?: elasticsearch.Explanation;
        fields?: any;
        highlight?: any;
        inner_hits?: any;
        matched_queries?: string[];
        sort?: string[];
    }[]>;
    deleteIndexById(indexP: string, typeP: string, idP: string): Promise<elasticsearch.DeleteDocumentResponse>;
    updateIndexById(indexP: string, typeP: string, idP: string, dataToUpdate: any): Promise<any>;
    findById(indexP: string, typeP: string, idP: string): Promise<elasticsearch.GetResponse<unknown>>;
    searchByQuery(type: string, query: any[], page?: number): Promise<elasticsearch.SearchResponse<unknown>>;
    normaleearch(index: string, query: any, page?: number, sort?: any[]): Promise<elasticsearch.SearchResponse<unknown>>;
    insert(index: string, dataToStore: any, id: any): Promise<any>;
}
