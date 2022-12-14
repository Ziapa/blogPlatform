export const posts = [
    {
        id: 1,
        title: "name1",
        shortDescription: "description1",
        content: "websiteUrl1",
        blogId: "blogId1",
        blogName: "blogName1"
    },
    {
        id: 2,
        title: "name2",
        shortDescription: "description2",
        content: "websiteUrl2",
        blogId: "blogId2",
        blogName: "blogName2"
    },
]

export const postsRepositories = {
    findPosts(id?: string | null) {
        if (id) {
            return posts.find(p => p.id === +id)
        } else {
            return posts
        }
    }
}