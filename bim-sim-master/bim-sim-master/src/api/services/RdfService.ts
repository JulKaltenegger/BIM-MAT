/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class RdfService {

    /**
     * @param id 
     * @param formData 
     * @returns any 
     * @throws ApiError
     */
    public static rdfControllerRdf(
id: string,
formData: {
query?: any;
},
): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/rdf/${id}`,
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
        });
    }

    /**
     * @param id 
     * @returns any 
     * @throws ApiError
     */
    public static rdfControllerNamespaces(
id: string,
): CancelablePromise<any> {
        return __request({
            method: 'GET',
            path: `/rdf/${id}/namespaces`,
        });
    }

    /**
     * Get Sensors by GUID of space
     * @param id Project id
     * @param item 
     * @returns any 
     * @throws ApiError
     */
    public static rdfControllerGetSensors(
id: string,
item: string,
): CancelablePromise<any> {
        return __request({
            method: 'GET',
            path: `/rdf/${id}/sensors`,
            query: {
                'item': item,
            },
        });
    }

}