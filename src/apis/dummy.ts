import { apiClient } from "@/lib/api-client";
export const dummyPosts = async () => {
    const response = await apiClient<Post[]>({
        method: "GET",
        url: "https://vue-project-kka9.vercel.app/posts",
    })

    return response
}