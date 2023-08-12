const myModal = new bootstrap.Modal("#register-modal")
let logged = sessionStorage.getItem("logged");
const session = localStorage.get("session");

checkedLogged();
// logar no sistema
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value
    const senha = document.getElementById("password-input").value
    const checkSession = document.getElementById("session-check").checked;

   const account = getAccount(email);

   if(!account){
    alert("Verifique o usuario ou a senha.")
    return;
}
if(account){
    if(account.password !== password){
        alert("Verifique o usuario ou a senha.")
        return;
    }

    saveSession(email, checkSession);
    
    window.location.href = "home.html";
}
})  




document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-create-input").value
    const senha = document.getElementById("password-create-input").value

    if(email.lenght < 5){
        alert("preencha o campo com um e-mail valido.");
        return;

    }
    
    if (senha.lenght < 4){
        alert("preencha a senha com no minimo 4 digitos.");

        return

    }
    saveAccount({
        login: email,
        senha: password,
        transactions: []
    });
    myModal.hide();

    alert("Conta criada com sucesso.");
});

function checkedLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }
    if(logged){
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data))
}


function saveSession(data, saveSession){
    if(saveSession){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key){
    const account = localStorage.getItem(key);

    if(account){
        return JSON.parse(account);
    }

    return "";
}

