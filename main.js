// Select DOM elements
const formationDropdown = document.querySelector('.Formation select');
const field = document.querySelector('.field');

// Define formations and their positions
const formations = {
  "3-4-3": [
    { id: "gk", top: "85%", left: "50%" }, // Goalkeeper
    { id: "cb1", top: "65%", left: "30%" }, // Center Backs
    { id: "cb2", top: "65%", left: "50%" },
    { id: "cb3", top: "65%", left: "70%" },
    { id: "lm", top: "40%", left: "20%" }, // Left Midfielder
    { id: "cm1", top: "40%", left: "40%" }, // Center Midfielders
    { id: "cm2", top: "40%", left: "60%" },
    { id: "rm", top: "40%", left: "80%" }, // Right Midfielder
    { id: "lw", top: "15%", left: "25%" }, // Left Winger
    { id: "st", top: "15%", left: "50%" }, // Striker
    { id: "rw", top: "15%", left: "75%" }, // Right Winger
  ],
  "4-3-3": [
    { id: "gk", top: "85%", left: "50%" },
    { id: "cb1", top: "65%", left: "20%" },
    { id: "cb2", top: "65%", left: "40%" },
    { id: "lb", top: "65%", left: "60%" },
    { id: "rb", top: "65%", left: "80%" },
    { id: "cm1", top: "40%", left: "30%" },
    { id: "cm2", top: "40%", left: "50%" },
    { id: "cm3", top: "40%", left: "70%" },
    { id: "lw", top: "15%", left: "25%" },
    { id: "st", top: "15%", left: "50%" },
    { id: "rw", top: "15%", left: "75%" },
  ],
  "5-2-3": [
    { id: "gk", top: "85%", left: "50%" },
    { id: "cb1", top: "65%", left: "10%" },
    { id: "cb2", top: "65%", left: "30%" },
    { id: "lb", top: "65%", left: "50%" },
    { id: "rb", top: "65%", left: "70%" },
    { id: "cm1", top: "65%", left: "90%" },
    { id: "cm2", top: "40%", left: "30%" },
    { id: "cm3", top: "40%", left: "70%" },
    { id: "lw", top: "15%", left: "25%" },
    { id: "st", top: "15%", left: "50%" },
    { id: "rw", top: "15%", left: "75%" },
  ],
  "5-4-1": [
    { id: "gk", top: "85%", left: "50%" },
    { id: "cb1", top: "65%", left: "10%" },
    { id: "cb2", top: "65%", left: "30%" },
    { id: "lb", top: "65%", left: "50%" },
    { id: "rb", top: "65%", left: "70%" },
    { id: "cm1", top: "65%", left: "90%" },
    { id: "cm2", top: "40%", left: "20%" },
    { id: "cm3", top: "40%", left: "40%" },
    { id: "lw", top: "40%", left: "60%" },
    { id: "st", top: "40%", left: "80%" },
    { id: "rw", top: "15%", left: "50%" },
  ],

};

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
    playerCard.textContent = pos.id.toUpperCase(); // Placeholder text for position

    // Add the card to the field
    field.appendChild(playerCard);
  });
}

// if selection changes
formationDropdown.addEventListener('change', (e) => {
  const selectedFormation = e.target.value;
  renderTeam(selectedFormation);
});

renderTeam("3-4-3");
