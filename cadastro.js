const supabase = window.supabase.createClient(
  "https://SEU_URL.supabase.co",
  "https://rkdrhnzvnttegnmkevlf.supabase.co"
);

let playerCount = 0;

function addPlayer() {
  if (playerCount >= 6) return alert("Máximo 6 jogadores!");

  playerCount++;

  const div = document.createElement("div");

  div.innerHTML = `
    <input type="text" placeholder="Nick do jogador" class="nick">
    <input type="file" class="photo">
  `;

  document.getElementById("players").appendChild(div);
}

async function saveTeam() {
  const teamName = document.getElementById("teamName").value;

  // salvar time
  const { data: team } = await supabase
    .from("teams")
    .insert([{ name: teamName }])
    .select();

  const teamId = team[0].id;

  // salvar jogadores
  const nicks = document.querySelectorAll(".nick");

  nicks.forEach(async (nick) => {
    await supabase.from("players").insert([
      {
        team_id: teamId,
        nickname: nick.value
      }
    ]);
  });

  alert("Time cadastrado!");
}
