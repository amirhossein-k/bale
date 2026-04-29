import { useQuery, UseQueryResult, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { getStoryMain } from './Req';


interface ApiResponse {
    success: boolean;
    data: any[]; // لیستی از محصولات
}

interface QueryConfigOptions {
    supplierId?: string;
    close: boolean;
    closeId: string
}

type SupplierRequestQueryKey =
    ['FetchDashboard', boolean] | ["FetchHome"]








// تابعی که تنظیمات useQuery را بر اساس نوع ورودی برمی‌گرداند
export const getQueryConfigStory = ({
    queryType,
    options,

}: {
    queryType: 'FetchDashboard' | 'FetchHome'; // انواع کوئری‌های ممکن

    options: QueryConfigOptions;
}): UseQueryOptions<ApiResponse, Error, ApiResponse, SupplierRequestQueryKey> => {
    const { supplierId, close, closeId } = options;
    console.log(`||| close: ${close}`)
    switch (queryType) {
        case 'FetchHome':
            return {
                queryKey: ["FetchHome"], //closeId = type Modal Open => BLOG | PRODUCT
                queryFn: () => getStoryMain(),
                // enabled: !!supplierId,
                staleTime: 1000 * 60 * 5,
            };
        case 'FetchDashboard':
            return {
                queryKey: ["FetchDashboard", close],
                queryFn: () => getStoryMain(),
                staleTime: 1000 * 60 * 3
            }
        // case 'other':
        //   return {
        //     queryKey: ["some-other-key", supplierId, currentPage],
        //     queryFn: () => getSomeOtherData(supplierId, currentPage),
        //     enabled: !!supplierId,
        //     staleTime: 1000 * 60 * 5,
        //   };
        default:
            throw new Error(`Unknown query type: ${queryType}`);
    }
};