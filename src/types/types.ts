import {Request} from "express";

export type RequestWithBody<Body> = Request<{}, {}, Body>
export type RequestWithQuery<Query> = Request<{}, {}, {}, Query>
export type RequestWithParamsAndQuery<Params, Query> = Request<Params, {}, {}, Query>
export type RequestWithParams<Params> = Request<Params>
export type RequestWithParamsAndBody<Params, Body> = Request<Params,{}, Body>



export type QueryRequest = {
    searchNameTerm: string | null
    searchLoginTerm: string | null,
    searchEmailTerm: string | null,
    sortDirection: "asc" | "desc"
    pageNumber: number
    pageSize: number
    sortBy: string
}

export type QueryRequestUser = {
    searchLoginTerm: string | null,
    searchEmailTerm: string | null,
    sortDirection: "asc" | "desc"
    pageNumber: number
    pageSize: number
    sortBy: string
}



