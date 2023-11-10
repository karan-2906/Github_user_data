import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify'

const Git = () => {
    const accessToken = "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";

    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [userData, setUserData] = useState("");
    const [repositories, setRepositories] = useState("");
    const [followers, setFollowers] = useState("");
    const [StarredRepos, setStarredRepos] = useState("");
    const [text, settext] = useState("Search Users Using Their Github Username");



    const handlleSearch = async (e) => {
        try {
            const response = await fetch(`https://api.github.com/users/${searchTerm}`)

            if (response.ok) {
                settext("")
                toast.success("User Profile Found")
                const user = await response.json();
                setUserData(user)

                const repos = await fetch(user.repos_url)
                const repositories = await repos.json();
                setRepositories(repositories)

                const follow = await fetch(user.followers_url)
                const followers = await follow.json();
                setFollowers(followers)

                const Starred = await fetch(`https://api.github.com/users/${searchTerm}/starred`);
                const StarredRepos = await Starred.json();
                setStarredRepos(StarredRepos)
            } else {
                toast.error("User not Found")
                settext("No User with Such Username")
                setUserData("")
                setRepositories("")
                setFollowers("")
                setStarredRepos("")
            }

        } catch (e) {
            console.log(e)
        }
    };

    const handleClick = (Url) => {
        window.open(Url, "_blank");
    };


    return (
        <div className="text-center align-middle items-center min-h-screen bg-zinc-800 ">
            <div className="text-3xl font-bold text-yellow-500 pt-4">Github Profile Finder</div>
            <div className="justify-center text-center p-4 flex gap-3">
                <input
                    className="border-2 p-2 w-1/4 rounded-lg"
                    placeholder="Search UserName"
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                />
                <button className="border-2 border-black p-1 px-2 rounded-xl text-lg bg-zinc-600 text-yellow-500 hover:text-yellow-600 hover:bg-zinc-500" onClick={handlleSearch} >
                    Search
                </button>
            </div>

            <div className="flex mt-2 gap-6 justify-center text-white">
                <p className="text-xl">{text}</p>
                {userData && (
                    <div className="justify-start font-semibold content-center border-2 p-6 rounded-3xl w-1/5 h-fit ">
                        <h2 className="text-2xl font-bold pb-2 text-yellow-500">{userData.name}</h2>
                        <center>    <img className="w-1/1 pb-2 rounded-full" src={userData.avatar_url} alt={userData.login} />  </center>
                        <p>Username: {userData.login}</p>
                        <p>Location: {userData.location}</p>
                        <p>Followers: {followers.length}</p>
                        <p>Total Repositories: {userData.public_repos}</p>
                        <p>Starred Repositories: {StarredRepos.length}</p>
                        <br />
                        <p>Bio: {userData.bio}</p>

                    </div>
                )}
                {repositories && (
                    <div className="font-semibold border-2 p-4 rounded-3xl h-fit mb-4 w-1/4">
                        <h3 className="text-2xl font-bold pb-2 text-yellow-500" >Repositories</h3>
                        <ul>
                            {repositories.map((repo) => (
                                <li className="hover:text-yellow-400" key={repo.id} onClick={() => handleClick(repo.html_url)}>
                                    {repo.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {followers && (
                    <div className="font-semibold border-2 p-4 rounded-3xl mb-4 w-1/6 h-fit">
                        <h3 className="text-2xl font-bold pb-2 text-yellow-500">Followers</h3>
                        <ul>
                            {followers.map((follower) => {
                                const follow= follower.html_url;
                                return (
                                    <li className="hover:text-yellow-400" key={follower.id} onClick={() => handleClick(follow)}>
                                        {follower.login}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Git