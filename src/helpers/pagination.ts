import {QueryRequest} from "../types/types";

export const paginationQuery = (body: QueryRequest): QueryRequest => {
    return {
        postId: body.postId || null,
        pageSize: +body.pageSize || 10,
        pageNumber: +body.pageNumber || 1,
        sortDirection: body.sortDirection === "asc" ? "asc" : "desc",
        searchNameTerm: body.searchNameTerm || null,
        searchLoginTerm: body.searchLoginTerm || null,
        searchEmailTerm: body.searchEmailTerm || null,
        sortBy: body.sortBy || "createdAt"
    }
}

export class PaginationViewModel<T> {
    pagesCount: number;
    page:number;
    pageSize: number;
    totalCount: number;
    items: T;
    constructor(count: number, pageSize: number, pageNumber: number, items: T) {
        this.pagesCount = Math.ceil(count / pageSize);
        this.page = pageNumber
        this.pageSize = pageSize
        this.totalCount = count
        this.items = items
    }
}

// export type PaginationViewType<T> = {
//     pagesCount: number,
//     page:number,
//     pageSize: number,
//     totalCount: number,
//     items: T
// }
//
// export const paginationView = (count: number, pageSize: number, pageNumber: number, items: BlogsOutputType[] | PostsOutputType[]) => {
//     const pageCount = Math.ceil(count / pageSize)
//     return {
//         pagesCount: pageCount,
//         page: pageNumber,
//         pageSize: pageSize,
//         totalCount: count,
//         items: items
//     }
// }