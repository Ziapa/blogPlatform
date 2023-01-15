import {usersCollection} from "../db";
import {UsersOutputType} from "../../types/usersType";
import {QueryRequest} from "../../types/types";
import {PaginationViewModel} from "../../helpers/pagination";

export const queryUsersRepositories = {


    async getUsers(pagination: QueryRequest): Promise<PaginationViewModel<UsersOutputType[]>> {

        const filter = {
                $or: [
                    {email: {$regex: pagination.searchEmailTerm ?? ""},$options: "i"},
                    {login: {$regex: pagination.searchLoginTerm ?? ""}, $options: "i" }
                ]
        }
        const skipped = (pagination.pageNumber - 1) * pagination.pageSize

        const users = await usersCollection.find(filter)
            .skip(skipped)
            .limit(pagination.pageSize)
            .sort({[pagination.sortBy]: pagination.sortDirection})
            .toArray()
        const count = await usersCollection.countDocuments(filter)

        const items: UsersOutputType[] = users.map(el => {
            return {
                id: el.id,
                login: el.login,
                email: el.email,
                createdAt: el.createdAt
            }
        })

        return new PaginationViewModel(count, pagination.pageSize, pagination.pageNumber, items)
    }
}