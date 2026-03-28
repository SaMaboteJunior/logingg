const SUPABASE_URL = "https://rkdrhnzvnttegnmkevlf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrZHJobnp2bnR0ZWdubWtldmxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3ODc2OTQsImV4cCI6MjA4OTM2MzY5NH0.unmMt3qrU3PL4tZYePpkGIP-OMKnuxNI0IAqRyWFt5U";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let isLogin = true;

function toggleMode() {
  isLogin = !isLogin;

  document.getElementById("title").innerText = 
    isLogin ? "Login" : "Criar Conta";

  document.querySelector("button").innerText = 
    isLogin ? "ENTRAR" : "CRIAR CONTA";
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (isLogin) {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert("Erro: " + error.message);
    } else {
      alert("Login feito!");
      window.location.href = "dashboard.html";
    }

  } else {
    const { data, error } = await client.auth.signUp({
      email,
      password
    });

    if (error) {
      alert("Erro: " + error.message);
    } else {
      alert("Conta criada! Verifique o email.");
    }
  }
}