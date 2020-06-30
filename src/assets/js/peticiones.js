const gitHubUser = `https://api.github.com/users/`;

const getUser = async (user) => {

    const response = await fetch(`${gitHubUser}${user}`);

    const data = await response.json();

    return data;
}



export {
    getUser,
}