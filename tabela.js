const supabase = window.supabase.createClient(
  "https://SEU_URL.supabase.co",
  "SUA_KEY"
);

async function loadRanking() {
  const { data } = await supabase
    .from("matches")
    .select("kills, position, teams(name)");

  let ranking = {};

  data.forEach(match => {
    const name = match.teams.name;

    if (!ranking[name]) {
      ranking[name] = { kills: 0, points: 0 };
    }

    ranking[name].kills += match.kills;

    // pontuação estilo FF
    ranking[name].points += match.kills + (12 - match.position);
  });

  render(ranking);
}

function render(ranking) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  Object.entries(ranking).forEach(([team, data]) => {
    tbody.innerHTML += `
      <tr>
        <td>${team}</td>
        <td>${data.kills}</td>
        <td>${data.points}</td>
      </tr>
    `;
  });
}

// tempo real 🔥
supabase
  .channel("realtime")
  .on("postgres_changes", { event: "*", schema: "public", table: "matches" }, loadRanking)
  .subscribe();

loadRanking();