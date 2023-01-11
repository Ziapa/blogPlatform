import {Request} from "express";

export type RequestWithBody<Body> = Request<{}, {}, Body>
export type RequestWithQuery<Query> = Request<{}, {}, {}, Query>
export type RequestWithParams<Params> = Request<Params>
export type RequestWithParamsAndBody<Params, Body> = Request<Params,{}, Body>



export type QueryRequest = {
    searchNameTerm: string | null
    sortDirection: "asc" | "desc"
    pageNumber: number
    pageSize: number
    sortBy: string
}



