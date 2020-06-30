const gitHubUser = `https://api.github.com/users/`;

const getInfoUser = async (user) => {

    const response = await fetch(`${gitHubUser}${user}`);

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw 'Username does not exist';
    }
}

export {
    getInfoUser,
}