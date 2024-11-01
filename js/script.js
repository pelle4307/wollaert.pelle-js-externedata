async function fetchZeldaGameInfo() {
    const query = document.getElementById("searchInput").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = '';
  
    if (query.length < 3) return;
  
    try {
      const response = await fetch(`https://zelda.fanapis.com/api/games?name=${query}`);
      const data = await response.json();
  
      const uniqueGames = new Set();
      if (data.data && data.data.length > 0) {
        data.data.forEach(game => {
          if (!uniqueGames.has(game.name)) {
            uniqueGames.add(game.name);
  
            const gameDiv = document.createElement("div");
            gameDiv.classList.add("game-info");
            gameDiv.innerHTML = `
              <h3>${game.name}</h3>
              <p><strong>Developer:</strong> ${game.developer || 'N/A'}</p>
              <p><strong>Publisher:</strong> ${game.publisher || 'N/A'}</p>
              <p><strong>Release Date:</strong> ${game.released_date || 'N/A'}</p>
              <p><strong>Description:</strong> ${game.description || 'No description available.'}</p>
            `;
            resultsDiv.appendChild(gameDiv);
          }
        });
      } else {
        resultsDiv.innerHTML = "<p>No results found for this game.</p>";
      }
    } catch (error) {
      resultsDiv.innerHTML = "<p>Failed to fetch game info. Please try again later.</p>";
    }
  }