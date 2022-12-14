export const blogs = [
    {
        id: "1",
        name: "name1",
        description: "description1",
        websiteUrl: "websiteUrl"
    },
    {
        id: "2",
        name: "name2",
        description: "description2",
        websiteUrl: "websiteUrl2"
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

export const blogsRepositories = {
    findBlog(id?: string | null) {
        if (id) {
            return blogs.find(b => b.id === id)
        } else {
            return blogs
        }
    },
    crateBlog(body: { name: string, description: string, websiteUrl: string }) {

        const newBlog = {
            id: pass_gen(16),
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl
        }

        if (newBlog) {
            blogs.push(newBlog)
            return newBlog
        }
    }
}