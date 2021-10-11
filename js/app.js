const loadTeams = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear search field
    searchField.value = '';
    const errorMessage = document.getElementById('error');
    if(searchText == '') {
        // error message
        errorMessage.innerText = `Please write something about sports to find best results`;
        // clear search results
        const searchResults = document.getElementById('search-results');
        searchResults.textContent = '';
    }
    else {
        // clear error message
        errorMessage.innerText = '';
        // load data
        const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        displayTeam(data.teams);
    }
}


const displayTeam = teams => {
    const searchResults = document.getElementById('search-results');
    searchResults.textContent = '';
    // get the error message
    const errorMessage = document.getElementById('error');
    if(teams.length == 0) {
        errorMessage.innerText = `no results found`;
    }
    else {
        teams.forEach(team => {
            const div = document.createElement('div');
            div.classList.add('col-md-6');
            div.innerHTML = `
                <div class="card p-1">
                    <img src="${team.strTeamBadge}" alt="teams">
                    <div class="card-body">
                        <h2>${team.strTeam}</h2>
                        <p>${team.strDescriptionEN.slice(0, 150)}</p>
                        <button onclick="loadTeamDetails('${team.idTeam}')" class="btn btn-success btn-sm" type="button">details</button>
                    </div>
                </div>
            `
            searchResults.appendChild(div);
        })
    }
}


const loadTeamDetails = async teamId => {
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayTeamDetails(data.teams[0])
}

const displayTeamDetails = team => {
    const singleTeam = document.getElementById('single-team');
    singleTeam.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${team.strTeamBadge}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${team.strTeam}</h5>
                    <p class="card-text">${team.strDescriptionEN.slice(0, 150)}</p>
                </div>
            </div>
        </div>
    `;
    singleTeam.appendChild(div);
}