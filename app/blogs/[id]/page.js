import {blogs} from "../../../data"

const BlogDetails = async ({ params }) => {
    const { id } = await params

    const blog = blogs.find((blog) => blog.id === parseInt(id))

    return (
        <div id="headers" dangerouslySetInnerHTML={{ __html: blog.body }} />
    )
}

export default BlogDetails