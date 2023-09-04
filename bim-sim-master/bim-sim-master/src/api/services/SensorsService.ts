/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class SensorsService {

    /**
     * @param id 
     * @param start 
     * @param end 
     * @param sample 
     * @returns any 
     * @throws ApiError
     */
    public static sensorsControllerGetRecords(
id: string,
start?: string,
end?: string,
sample?: number,
): CancelablePromise<any> {
        return __request({
            method: 'GET',
            path: `/sensors/${id}/records`,
            query: {
                'start': start,
                'end': end,
                'sample': sample,
            },
        });
    }

}