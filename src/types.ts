export interface Repo {
    name : string,
    id: number,
    private: boolean,
    fork: boolean,
    html_url : string,
    created_at: string,
    forks_count : number,
    forks: number,
    visibility: string,
    language: string,
    stargazers_count: number,
}
export interface ErrorRepo {
    message : string,
    documentation_url: string
}