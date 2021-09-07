const inpUtilisateur = document.querySelector('.form-groupe:nth-child(1) input');
const inpMail = document.querySelector('.form-groupe:nth-child(2) input');
const inpMdp = document.querySelector('.form-groupe:nth-child(3) input');
const inpConfirme = document.querySelector('.form-groupe:nth-child(4) input');
const allImg = document.querySelectorAll('.icone-verif');
const allSpan = document.querySelectorAll('span');
const allLigne = document.querySelectorAll('.ligne div');
const btn = document.querySelector('button');
const formulaire = document.querySelector('form');
const iconeOeilMdp = document.querySelector('.icone-oeil-mdp');
const iconeOeilConfirme = document.querySelector('.icone-oeil-confirme');

inpUtilisateur.addEventListener('input', (e) => {
    if(e.target.value.length === 0){
        allImg[0].style.display = "none";
        allSpan[0].style.display = "none";
    }
    else if(e.target.value.length >= 3){
        allImg[0].style.display = "block";
        allImg[0].src = "ressources/check.svg";
        allSpan[0].style.display = "none";
    } else{
        allImg[0].style.display = "block";
        allImg[0].src = "ressources/error.svg";
        allSpan[0].style.display = "inline";
    }
})

inpMail.addEventListener('input', (e) => {
    const regexEmail = /\S+@\S+\.\S+/;
    if(e.target.value.length === 0){
        allImg[1].style.display = "none";
        allSpan[1].style.display = "none";
    }
    else if(e.target.value.search(regexEmail) === 0){
        allImg[1].style.display = "block";
        allImg[1].src = "ressources/check.svg";
        allSpan[1].style.display = "none";
    } else if(e.target.value.search(regexEmail) === -1){
        allImg[1].style.display = "block";
        allImg[1].src = "ressources/error.svg";
        allSpan[1].style.display = "inline";
    }
})

//  Validation création du MDP

let valeurInp;
let mdpVisible = false;
let confirmeVisible = false;

const specialCar = /[^a-zA-Z0-9]/;
const alphabet =  /[a-z]/i;
const chiffres = /[0-9]/;

let objValidation = {
    symbole:0,
    lettre:0,
    chiffre:0,
}

inpMdp.addEventListener('input', (e) => {
    valeurInp = e.target.value;
    allLigne[0].style.display = 'block';
    allLigne[1].style.display = 'block';
    allLigne[2].style.display = 'block';
    iconeOeilMdp.style.display = 'block';
    iconeOeilMdp.style.opacity = '1';

    if(valeurInp.search(specialCar) !== -1){
        objValidation.symbole = 1;
    }
    if(valeurInp.search(alphabet) !== -1){
        objValidation.lettre = 1;
    }
    if(valeurInp.search(chiffres) !== -1){
        objValidation.chiffre = 1;
    }

    if(e.inputType = 'deleteContentBackward'){
        if(valeurInp.search(specialCar) === -1){
            objValidation.symbole = 0;
        }
        if(valeurInp.search(alphabet) === -1){
            objValidation.lettre = 0;
        }
        if(valeurInp.search(chiffres) === -1){
            objValidation.chiffre = 0;
        }
    }

    let testAll = 0;
    for(const property in objValidation){
        if(objValidation[property] > 0){
            testAll++;
        }
    }
    if(testAll < 3){
        allSpan[2].style.display = "inline";
        allImg[2].style.display = "block";
        allImg[2].src = "ressources/error.svg";
    } else{
        allSpan[2].style.display = "none";
        allImg[2].src = "ressources/check.svg";
    }

    // Force du mdp
    if(valeurInp.length === 0){
        allLigne[0].style.display = 'none';
        allLigne[1].style.display = 'none';
        allLigne[2].style.display = 'none';
        allImg[2].style.display = "none";
        allSpan[2].style.display = "none";
        iconeOeilMdp.src = "ressources/visibility.png";
        iconeOeilMdp.style.opacity = '0';
        iconeOeilMdp.style.display = 'none';
        mdpVisible = false;
    }
    if(valeurInp.length > 0 && valeurInp.length <= 5){
        allLigne[0].style.opacity = '1';
        allLigne[1].style.opacity = '0';
        allLigne[2].style.opacity = '0';
    } else if(valeurInp.length > 5 && valeurInp.length <= 9){
        allLigne[0].style.opacity = '0';
        allLigne[1].style.opacity = '1';
        allLigne[2].style.opacity = '0';
    } else if(valeurInp.length > 9){
        allLigne[0].style.opacity = '0';
        allLigne[1].style.opacity = '0';
        allLigne[2].style.opacity = '1';
    }
})

iconeOeilMdp.addEventListener('click', () => {
    mdpVisible = !mdpVisible;
    if(mdpVisible){
        inpMdp.type = "text"; 
        iconeOeilMdp.src = "ressources/invisible.png";
    } else{
        inpMdp.type = "password"; 
        iconeOeilMdp.src = "ressources/visibility.png";
    }
})

// Confirmation

inpConfirme.addEventListener('input', (e) => {
    iconeOeilConfirme.style.display = 'block';
    iconeOeilConfirme.style.opacity = '1';
    if(e.target.value.length === 0){
        allImg[3].style.display = "none";
        iconeOeilConfirme.src = "ressources/visibility.png";
        iconeOeilConfirme.style.opacity = '0';
        iconeOeilConfirme.style.display = 'none';
        mdpVisible = false;
    }
    else{
        if(e.target.value !== valeurInp){
            allImg[3].style.display = "block";
            allImg[3].src = "ressources/error.svg";
        } else if(e.target.value === valeurInp){
            allImg[3].src = "ressources/check.svg";
        }
    } 
})

iconeOeilConfirme.addEventListener('click', () => {
    confirmeVisible = !confirmeVisible;
    if(confirmeVisible){
        inpConfirme.type = "text"; 
        iconeOeilConfirme.src = "ressources/invisible.png";
    } else{
        inpConfirme.type = "password"; 
        iconeOeilConfirme.src = "ressources/visibility.png";
    }
})

