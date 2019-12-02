export interface Pagination {
    currenPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}
// this class to stor the inteface information
export class PaginatedResult<T> { // use T to use pagination Not Just For User may be for Photo,Messages .. etc
    result: T; // store class result of user or massages .. etc .(reslut) take data from body
    pagination: Pagination; // pagination (take) data from header
}
