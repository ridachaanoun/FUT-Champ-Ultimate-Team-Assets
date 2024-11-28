// Select DOM elements
const formationDropdown = document.querySelector('.Formation select');
const field = document.querySelector('.field');
const closePopup = document.getElementById("close");
const bigcontainer = document.querySelector(".theall");
const saveSquadBtn = document.getElementById("saveSquad");
const confirmationPopup = document.getElementById("save-confirmation-popup");
const successPopup = document.getElementById("success-popup");
const confirmSave = document.getElementById("confirm-save");
const cancelSave = document.getElementById("cancel-save");
const okSuccess = document.getElementById("ok-success");

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
    { id: "RW", top: "40%", left: "80%", position: "RW" },
    { id: "ST", top: "15%", left: "50%", position: "ST" },
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
            <div class="rating2">${player.rating  || ""}</div>
            <div class="position2">${player.position  || ""}</div>
            <img class="photo2" src="${player.photo || ""}" alt="${player.name || ""}">
            <h2 class="name2">${player.name || ""}</h2>
            <div class="stats2">
            ${player.position ? `
              ${player.position === "GK" ? `
                <span>DIV ${player.diving || ""}</span>
                <span>HAN ${player.handling || ""}</span>
                <span>KIK ${player.kicking || ""}</span>
                <span>REF ${player.reflexes || ""}</span>
                <span>PAC ${player.speed || ""}</span>
                <span>PSN ${player.positioning || ""}</span>
              ` : `
                <span>PAC ${player.pace || ""}</span>
                <span>SHO ${player.shooting || ""}</span>
                <span>PAS ${player.passing || ""}</span>
                <span>DRI ${player.dribbling || ""}</span>
                <span>DEF ${player.defending || ""}</span>
                <span>PHY ${player.physical || ""}</span>
              `}`
              : ``}
              
            </div>
            <img class="flag2" src="${player.flag || ""}" alt="${player.nationality || ""}">
            <img class="logo2" src="${player.logo || ""}" alt="${player.club || ""}">
          </div>
        `;
        }




    playerCard.addEventListener("click", (e) => {
      let carrentid = e.currentTarget.id; 

      const carrentcard = document.getElementById(carrentid)
      
    
      const container = document.getElementById("card-container");
      container.innerHTML = "";
      async function getPlayers() {
        // Fetch player based on position
        const res = await fetch(`http://localhost:3000/players?position=${pos.position}`);
        const playerData = await res.json();

        playerData.forEach((player) => {
          // Create the player card
          const card = document.createElement("div");
          card.className = "player-card";

          if (player.position === "GK") {
            card.innerHTML = `
              <div class="rating">${player.rating || ""}</div>
              <div class="position">${player.position || ""}</div>
              <img class="photo" src="${player.photo || ""}" alt="${player.name}">
              <h2 class="name">${player.name || ""}</h2>
              <div class="stats">
                <span>DIV ${player.diving || ""}</span>
                <span>HAN ${player.handling || ""}</span>
                <span>KIK ${player.kicking || ""}</span>
                <span>REF ${player.reflexes || ""}</span>
                <span>PAC ${player.speed || ""}</span>
                <span>PSN ${player.positioning || ""}</span>
              </div>
              <img class="flag" src="${player.flag || ""}" alt="${player.nationality || ""}">
              <img class="logo" src="${player.logo || ""}" alt="${player.club || ""}">
            `;
          } else {
            card.innerHTML = `
              <div class="rating">${player.rating || ""}</div>
              <div class="position">${player.position || ""}</div>
              <img class="photo" src="${player.photo || ""}" alt="${player.name || ""}">
              <h2 class="name">${player.name || ""}</h2>
              ${player.position ? `
              <div class="stats">
                <span>PAC ${player.pace || ""}</span>
                <span>SHO ${player.shooting || ""}</span>
                <span>PAS ${player.passing || ""}</span>
                <span>DRI ${player.dribbling || ""}</span>
                <span>DEF ${player.defending || ""}</span>
                <span>PHY ${player.physical || ""}</span>
              </div>
              ` : ``}

              <img class="flag" src="${player.flag || ""}" alt="${player.nationality || ""}">
              <img class="logo" src="${player.logo || ""}" alt="${player.club || ""}">
            `;
          }

          // Add click event to show player details in another card
          card.addEventListener("click", () => {
            // Save the selected player to the currentPlayers object
            currentPlayers[carrentid] = player;
            console.log(player);
            console.log("Current ID:", carrentid);
            console.log("Element with ID:", document.getElementById(carrentid));
            carrentcard.innerHTML = `
              <div class="player-detail-card">
                <div class="rating2">${player.rating  || ""}</div>
                <div class="position2">${player.position  || ""}</div>
                <img class="photo2" src="${player.photo || ""}" alt="${player.name || ""}">
                <h2 class="name2">${player.name || ""}</h2>
                <div class="stats2">
                ${player.position ? `
                  ${player.position === "GK" ? `
                    <span>DIV ${player.diving || ""}</span>
                    <span>HAN ${player.handling || ""}</span>
                    <span>KIK ${player.kicking || ""}</span>
                    <span>REF ${player.reflexes || ""}</span>
                    <span>PAC ${player.speed || ""}</span>
                    <span>PSN ${player.positioning || ""}</span>
                  ` : `
                    <span>PAC ${player.pace || ""}</span>
                    <span>SHO ${player.shooting || ""}</span>
                    <span>PAS ${player.passing || ""}</span>
                    <span>DRI ${player.dribbling || ""}</span>
                    <span>DEF ${player.defending || ""}</span>
                    <span>PHY ${player.physical || ""}</span>
                  `}`
                  : ``}
                  
                </div>
                <img class="flag2" src="${player.flag || ""}" alt="${player.nationality || ""}">
                <img class="logo2" src="${player.logo || ""}" alt="${player.club || ""}">
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
  // Show the confirmation popup
  confirmationPopup.style.display = "flex";

  // Confirm save
  console.log(currentPlayers);
  confirmSave.addEventListener("click", () => {
    const squadData = {
      formation: formationDropdown.value,
      players: currentPlayers,
    };

    localStorage.setItem("savedSquad", JSON.stringify(squadData));

    // Close the confirmation popup and show the success popup
    confirmationPopup.style.display = "none";
    successPopup.style.display = "flex";
  });

  // Cancel save
  cancelSave.addEventListener("click", () => {
    confirmationPopup.style.display = "none";
  });

  // Hide success popup when OK is clicked
  okSuccess.addEventListener("click", () => {
    successPopup.style.display = "none";
  });
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


// Show attributes of a player
  document.getElementById("gkAttributes").style.display = "flex";
  document.getElementById("playerPosition").addEventListener("change", (e) => {
  const position = e.target.value;
  document.getElementById("gkAttributes").style.display = position === "GK" ? "flex" : "none";
  document.getElementById("playerAttributes").style.display = position !== "GK" ? "flex" : "none";
});

// Add EventListener to Form when user submit it
document.getElementById("addPlayerForm").addEventListener("submit", async (e) => {

  const formData = new FormData(e.target);

  const playerData = {
    name: formData.get("name"),
    position: formData.get("position"),
    photo: `playerImg/${formData.get("photo").name}`,
    flag: `playerImg/${formData.get("flag").name}`,
    logo: `playerImg/${formData.get("logo").name}`,
    ...(formData.get("position") === "GK"
      ? {
          rating: formData.get("rating") || 0,
          diving: formData.get("diving") || 0,
          handling: formData.get("handling") || 0,
          kicking: formData.get("kicking") || 0,
          reflexes: formData.get("reflexes") || 0,
          speed: formData.get("speed") || 0,
          positioning: formData.get("positioning") || 0,
        }
      : {
          rating: formData.get("rating") || 0,
          pace: formData.get("pace") || 0,
          shooting: formData.get("shooting") || 0,
          passing: formData.get("passing") || 0,
          dribbling: formData.get("dribbling") || 0,
          defending: formData.get("defending") || 0,
          physical: formData.get("physical") || 0,
        }),
  };

  try {
    await fetch("http://localhost:3000/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(playerData),
    });

    alert("Player added successfully!");
    document.querySelector(".add-player-popup").style.display = "none";
  } catch (error) {
    alert("Failed to add player: " + error.message);
  }
});

// Open and close Player popup
document.getElementById("openAddPlayerPopup").addEventListener("click", () => {
  document.querySelector(".add-player-popup").style.display = "block";
});

document.getElementById("closeAddPlayerPopup").addEventListener("click", () => {
  document.querySelector(".add-player-popup").style.display = "none";
});
