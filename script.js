const carre = document.getElementById("carre")
var score = document.getElementById("score");
var message = document.getElementById("message")
var ancien = 1;
var move = setInterval(deplacer,1000);
var afficheniveau = document.getElementById("niveau");
const largeur = window.innerWidth;
const hauteur = window.innerHeight;
const tailleCarre = carre.offsetWidth;
let gameOver = false;
let tempsRestant = 100;
const bouton = document.getElementById("rejouer");
let chrono = setInterval(diminuerTemps, 100);
function perdre(){
    gameOver = true;
    clearInterval(move);
    clearInterval(chrono);
    message.textContent = "Game Over";
    message.style.background = "red";
    bouton.style.display = "block";
}
function deplacer(){
    const x = Math.random() * ((largeur-50) - tailleCarre);
    const y = Math.random() * ((hauteur-50) - tailleCarre);
    carre.style.transform = `translate(${x}px, ${y}px)`;
    // carre.style.transform = "translate(200px,200px)";
}

function scores(){
    score.textContent = Number(score.textContent)  + 1
    var niveau = Math.floor(Number(score.textContent)/10) +1 ;
    afficheniveau.textContent = niveau;
    if ( niveau !== ancien ){
        message.innerHTML = "Niveau superieur";
        message.classList.add("animation");
        setTimeout(disparait,2000);
        let vitesse = 1000 / (2 ** (niveau - 1));
        clearInterval(move);
        move = setInterval(deplacer,vitesse)
        ancien = niveau;
    }
    if(gameOver) return;

    score.textContent = Number(score.textContent) + 1;

    tempsRestant = 100;
    temps.style.width = "100%";  
}

function disparait(){
    message.innerHTML = "";
}

let touche = false;

carre.addEventListener("touchstart", (e) => {
    e.preventDefault();
    touche = true;
    scores();
});

carre.addEventListener("click", () => {
    if (!touche) {
        scores();
    }
    touche = false;
});
function diminuerTemps(){

    tempsRestant--;

    temps.style.width = tempsRestant + "%";

    if(tempsRestant <= 0){
        perdre();
    }

}
setInterval(diminuerTemps,100);
function recommencer(){

    gameOver = false;

    score.textContent = 0;

    tempsRestant = 100;
    temps.style.width = "100%";

    message.textContent = "";

    bouton.style.display = "none";

    move = setInterval(deplacer, 1000);
}

bouton.addEventListener("click", recommencer);

