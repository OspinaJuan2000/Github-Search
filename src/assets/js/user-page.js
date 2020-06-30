import { getInfoUser } from "./peticiones";

const formSearchUser = document.querySelector('#search-user'),
    containerUserData = document.querySelector('.container-data-user'),
    containerError = document.querySelector('.container-error'),
    containerInput = document.querySelector('.container'),
    restartApp = document.querySelector('#again');



const events = () => {

    formSearchUser.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = formSearchUser['username'].value;

        if (username.trim() !== '') {

            containerInput.style.display = 'none';
            containerUserData.style.display = 'block';

            getInfoUser(username)
                .then((data) => {
                    if (data) {
                        renderDataUserHTML(data);
                    } else {
                        renderErrorHTML(`User not found! Try again`);
                    }
                }).catch(() => {
                    renderErrorHTML(`Something went wrong. Try again later!`);
                });
        }
    });

    restartApp.addEventListener('click', () => {
        containerInput.style.display = 'flex';
        containerUserData.style.display = 'none';
    });
}

const renderDataUserHTML = ({ login, avatar_url, html_url, public_repos, followers, following, created_at }) => {


    const templateHTML = `
    <section class="user-data">
        <div class="personal-information">
            <img src="${avatar_url}" alt="">
            <a href="${html_url}" target="_blan">@${login}</a>
            <p><i class="fas fa-calendar-alt"></i> Created at: ${new Date(created_at).toLocaleDateString()}</p>
            <div class="github-information">
                <div class="repo"><span>${public_repos}</span> Repositories</div>
                <div class="followers"><span>${followers}</span> Followers</div>
                <div class="following"><span>${following}</span> Following</div>
            </div>
        </div>
    </section>
    `;

    cleanLastUser();

    const div = document.createElement('div');
    div.innerHTML = templateHTML;
    containerUserData.appendChild(div.firstElementChild);
}


const renderErrorHTML = (msj) => {
    document.querySelector('#error-msg a').textContent = msj;
    containerError.style.display = 'flex';
}


const cleanLastUser = () => {
    if (document.querySelector('.user-data')) {
        document.querySelector('.user-data').remove();
    }
}


export const init = () => {
    events();
}