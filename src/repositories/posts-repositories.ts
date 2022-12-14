export const posts = [
    {
        id: "1",
        title: "name1",
        shortDescription: "description1",
        content: "websiteUrl1",
        blogId: "blogId1",
        blogName: "blogName1"
    },
    {
        id: "2",
        title: "name2",
        shortDescription: "description2",
        content: "websiteUrl2",
        blogId: "blogId2",
        blogName: "blogName2"
    },
]

function pass_gen(len: number) {
    let chrs = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
    let str = '';
    for (let i = 0; i < len; i++) {
        let pos = Math.floor(Math.random() * chrs.length);
        str += chrs.substring(pos,pos+1);
    }
    return str;
}

export const postsRepositories = {
    findPosts(id?: string | null) {
        if (id) {
            return posts.find(p => p.id === id)
        } else {
            return posts
        }
    },
    createPost(body: { title: string, shortDescription: string, content: string, blogId: string }) {
        const newPost = {
            id: pass_gen(16),
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName: body.title
        }

        if (newPost) {
            posts.push(newPost)
            return newPost
        }
    }
}