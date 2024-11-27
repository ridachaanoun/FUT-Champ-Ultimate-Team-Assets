// Select DOM elements
const formationDropdown = document.querySelector('.Formation select');
const field = document.querySelector('.field');
const closePopup = document.getElementById("close");
const bigcontainer = document.querySelector(".theall");
const saveSquadBtn = document.getElementById("saveSquad");

// Define formations and their positions
const formations = {
  "3-4-3": [
    { id: "GK", top: "85%", left: "50%", position: "GK" },
    { id: "CB1", top: "65%", left: "30%", position: "CB" },
    { id: "CB2", top: "65%", left: "50%", position: "CB" },
    { id: "LB", top: "65%", left: "70%", position: "LB" },
    { id: "RB", top: "40%", left: "20%", position: "RB" },
    { id: "CM1", top: "40%", left: "40%", position: "CM" },
    { id: "CM2", top: "40%", left: "60%", position: "CM" },
    { id: "CM3", top: "40%", left: "80%", position: "CM" },
    { id: "LW", top: "15%", left: "25%", position: "LW" },
    { id: "ST", top: "15%", left: "50%", position: "ST" },
    { id: "RW", top: "15%", left: "75%", position: "RW" },
  ],
  "4-3-3": [
    { id: "GK", top: "85%", left: "50%", position: "GK" },
    { id: "CB1", top: "65%", left: "20%", position: "CB" },
    { id: "CB2", top: "65%", left: "40%", position: "CB" },
    { id: "LB", top: "65%", left: "60%", position: "LB" },
    { id: "RB", top: "65%", left: "80%", position: "RB" },
    { id: "CM1", top: "40%", left: "30%", position: "CM" },
    { id: "CM2", top: "40%", left: "50%", position: "CM" },
    { id: "CM3", top: "40%", left: "70%", position: "CM" },
    { id: "LW", top: "15%", left: "25%", position: "LW" },
    { id: "ST", top: "15%", left: "50%", position: "ST" },
    { id: "RW", top: "15%", left: "75%", position: "RW" },
  ],
  "5-2-3": [
    { id: "GK", top: "85%", left: "50%", position: "GK" },
    { id: "CB1", top: "65%", left: "10%", position: "CB" },
    { id: "CB2", top: "65%", left: "30%", position: "CB" },
    { id: "LB", top: "65%", left: "50%", position: "LB" },
    { id: "RB", top: "65%", left: "70%", position: "RB" },
    { id: "CM1", top: "65%", left: "90%", position: "CM" },
    { id: "CM2", top: "40%", left: "30%", position: "CM" },
    { id: "CM3", top: "40%", left: "70%", position: "CM" },
    { id: "LW", top: "15%", left: "25%", position: "LW" },
    { id: "ST", top: "15%", left: "50%", position: "ST" },
    { id: "RW", top: "15%", left: "75%", position: "RW" },
  ],
  "5-4-1": [
    { id: "GK", top: "85%", left: "50%", position: "GK" },
    { id: "CB1", top: "65%", left: "10%", position: "CB" },
    { id: "CB2", top: "65%", left: "30%", position: "CB" },
    { id: "LB", top: "65%", left: "50%", position: "LB" },
    { id: "RB", top: "65%", left: "70%", position: "RB" },
    { id: "CM1", top: "65%", left: "90%", position: "CM" },
    { id: "CM2", top: "40%", left: "20%", position: "CM" },
    { id: "CM3", top: "40%", left: "40%", position: "CM" },
    { id: "LW", top: "40%", left: "60%", position: "LW" },
    { id: "ST", top: "40%", left: "80%", position: "ST" },
    { id: "RW", top: "15%", left: "50%", position: "RW" },
  ],
};
let currentPlayers ={}
// Function to render the team based on the selected formation

function renderTeam(formation) {
  field.innerHTML = '';

  const positions = formations[formation];

  positions.forEach((pos) => {
    const playerCard = document.createElement('button');
    playerCard.classList.add('cards-container');
    playerCard.id = pos.id;
    playerCard.style.position = 'absolute';
    playerCard.style.top = pos.top;
    playerCard.style.left = pos.left;
    playerCard.style.transform = "translate(-50%, -50%)";
    playerCard.textContent = pos.id.toUpperCase(); 


        // If a player is already selected for this position, render the player details
        if (currentPlayers[pos.id]) {
          const player = currentPlayers[pos.id];
          playerCard.innerHTML = `
              <div class="player-detail-card">
                <div class="rating2">${player.rating}</div>
                <div class="position2">${player.position}</div>
                <img class="photo2" src="${player.photo}" alt="${player.name}">
                <h2 class="name2">${player.name}</h2>
                <div class="stats2">
                  ${player.position === "GK" ? `
                    <span>DIV ${player.diving}</span>
                    <span>HAN ${player.handling}</span>
                    <span>KIK ${player.kicking}</span>
                    <span>REF ${player.reflexes}</span>
                    <span>PAC ${player.speed}</span>
                    <span>PSN ${player.positioning}</span>
                  ` : `
                    <span>PAC ${player.pace}</span>
                    <span>SHO ${player.shooting}</span>
                    <span>PAS ${player.passing}</span>
                    <span>DRI ${player.dribbling}</span>
                    <span>DEF ${player.defending}</span>
                    <span>PHY ${player.physical}</span>
                  `}
                </div>
                <img class="flag2" src="${player.flag}" alt="${player.nationality}">
                <img class="logo2" src="${player.logo}" alt="${player.club}">
              </div>
            `;
        }




    playerCard.addEventListener("click", (e) => {
      let carrentid = e.currentTarget.id; 

      const carrentcard = document.getElementById(carrentid)
      
    
      const container = document.getElementById("card-container");
      container.innerHTML = "";
      async function getPlayers() {
        // Fetch player data based on position
        const res = await fetch(`http://localhost:3000/players?position=${pos.position}`);
        const playerData = await res.json();

        playerData.forEach((player) => {
          // Create the player card
          const card = document.createElement("div");
          card.className = "player-card";

          if (player.position === "GK") {
            card.innerHTML = `
              <div class="rating">${player.rating}</div>
              <div class="position">${player.position}</div>
              <img class="photo" src="${player.photo}" alt="${player.name}">
              <h2 class="name">${player.name}</h2>
              <div class="stats">
                <span>DIV ${player.diving}</span>
                <span>HAN ${player.handling}</span>
                <span>KIK ${player.kicking}</span>
                <span>REF ${player.reflexes}</span>
                <span>PAC ${player.speed}</span>
                <span>PSN ${player.positioning}</span>
              </div>
              <img class="flag" src="${player.flag}" alt="${player.nationality}">
              <img class="logo" src="${player.logo}" alt="${player.club}">
            `;
          } else {
            card.innerHTML = `
              <div class="rating">${player.rating}</div>
              <div class="position">${player.position}</div>
              <img class="photo" src="${player.photo}" alt="${player.name}">
              <h2 class="name">${player.name}</h2>
              <div class="stats">
                <span>PAC ${player.pace}</span>
                <span>SHO ${player.shooting}</span>
                <span>PAS ${player.passing}</span>
                <span>DRI ${player.dribbling}</span>
                <span>DEF ${player.defending}</span>
                <span>PHY ${player.physical}</span>
              </div>
              <img class="flag" src="${player.flag}" alt="${player.nationality}">
              <img class="logo" src="${player.logo}" alt="${player.club}">
            `;
          }

          // Add click event to show player details in another card
          card.addEventListener("click", () => {
            // Save the selected player to the currentPlayers object
            currentPlayers[carrentid] = player;
            console.log("Current ID:", carrentid);
            console.log("Element with ID:", document.getElementById(carrentid));
            carrentcard.innerHTML = `
              <div class="player-detail-card">
                <div class="rating2">${player.rating}</div>
                <div class="position2">${player.position}</div>
                <img class="photo2" src="${player.photo}" alt="${player.name}">
                <h2 class="name2">${player.name}</h2>
                <div class="stats2">
                  ${player.position === "GK" ? `
                    <span>DIV ${player.diving}</span>
                    <span>HAN ${player.handling}</span>
                    <span>KIK ${player.kicking}</span>
                    <span>REF ${player.reflexes}</span>
                    <span>PAC ${player.speed}</span>
                    <span>PSN ${player.positioning}</span>
                  ` : `
                    <span>PAC ${player.pace}</span>
                    <span>SHO ${player.shooting}</span>
                    <span>PAS ${player.passing}</span>
                    <span>DRI ${player.dribbling}</span>
                    <span>DEF ${player.defending}</span>
                    <span>PHY ${player.physical}</span>
                  `}
                </div>
                <img class="flag2" src="${player.flag}" alt="${player.nationality}">
                <img class="logo2" src="${player.logo}" alt="${player.club}">
              </div>
            `;
          });

          // Add the card to the container
          container.appendChild(card);
        });
      }
      getPlayers();

      bigcontainer.style.display = "flex";
    });

    // Add the card to the field
    field.appendChild(playerCard);
  });
}

// Save squad to localStorage
function saveSquad() {
  const squadData = {
    formation: formationDropdown.value,
    players: currentPlayers,
  };
  localStorage.setItem("savedSquad", JSON.stringify(squadData));
  alert("Squad saved successfully!");
}

// Load squad from localStorage
function loadSquad() {
  const savedSquad = JSON.parse(localStorage.getItem("savedSquad"));
  if (savedSquad) {
    formationDropdown.value = savedSquad.formation;
    currentPlayers = savedSquad.players;
    renderTeam(savedSquad.formation);
  } else
    renderTeam(formationDropdown.value);
}

// Handle formation change
formationDropdown.addEventListener('change', (e) => {
  const selectedFormation = e.target.value;
  renderTeam(selectedFormation);
});

// Save squad in local storage when user clicks Save Squad btn
saveSquadBtn.addEventListener("click", saveSquad);

// Close the popup
closePopup.addEventListener("click", () => {
  bigcontainer.style.display = "none";
});


loadSquad();
