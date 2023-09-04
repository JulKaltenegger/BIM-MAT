/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class ProjectService {

    /**
     * @param id 
     * @returns any 
     * @throws ApiError
     */
    public static projectsControllerFindOne(
id: string,
): CancelablePromise<any> {
        return __request({
            method: 'GET',
            path: `/projects/${id}`,
        });
    }

    /**
     * @param id 
     * @returns any 
     * @throws ApiError
     */
    public static projectsControllerGetXkt(
id: string,
): CancelablePromise<any> {
        return __request({
            method: 'GET',
            path: `/projects/${id}/xkt`,
        });
    }

    /**
     * @param id 
     * @param formData 
     * @returns any 
     * @throws ApiError
     */
    public static projectsControllerUploadIfc(
id: string,
formData: {
file?: Blob;
},
): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/projects/${id}/ifc`,
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

}