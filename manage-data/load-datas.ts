export async function loadPlayers() {
    // Call an external API endpoint to get posts

    const data = await fetch('http://127.0.0.1:3333/api/players',{
      method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer Mjg3.HjxitqO5Bq3uQxFZ6wXd49xAvdQ1heP1qbPfCXHaTpq01tstEbbxo_YsIDFQ`,
        },
    });
    const players = await data.json()
    return players
  }

  export async function loadTeams() {
    // Call an external API endpoint to get posts
    const dataTeams = await fetch('http://127.0.0.1:3333/api/times')
    const teams = await dataTeams.json()
    return teams;
  }
  export async function loadTeamById(id:Number) {
    // Call an external API endpoint to get posts
    const data = await fetch(`http://127.0.0.1:3333/api/times/${id}`);
    const teams = await data.json()
    return teams;
  }
  export async function loadMatchs() {
    // Call an external API endpoint to get posts
    const data = await fetch('http://127.0.0.1:3333/api/partidas')
    const match = await data.json()
    return match;
  }
  export async function loadUserByEmail(email:string) {
    // Call an external API endpoint to get posts
    const data = await fetch(`http://127.0.0.1:3333/api/users/${email}`);
    const users = await data.json()
    return users;
  }