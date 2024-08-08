// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

// On crée une fonction qui va généerer la liste des pièces
function genererPieces(pieces) {
for (let i = 0; i < pieces.length; i++) {

    const article = pieces[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");

    // On crée l’élément img.
    const imageElement = document.createElement("img");

    // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
    imageElement.src = article.image;

    // Idem pour le nom, le prix et la catégorie...
    const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;

    const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

    const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

    const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment."

    const disponibiliteElement = document.createElement("p");
        disponibiliteElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
    
    // On rattache la balise article à la section Fiches
    sectionFiches.appendChild(pieceElement);

    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);

    // Idem pour le nom, le prix et la catégorie...
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(disponibiliteElement);
    }
}

genererPieces(pieces);

//gestion des boutons 
const boutonTrier = document.querySelector(".btn-trier");

    boutonTrier.addEventListener("click", function () {
        const piecesOrdonnees = Array.from(pieces);
        piecesOrdonnees.sort(function (a, b) {
            return a.prix - b.prix;
        });
        document.querySelector(".fiches").innerHTML = "";
        genererPieces(piecesOrdonnees);
 });

const boutonTrierDecroissant = document.querySelector(".btn-trier-2")

    boutonTrierDecroissant.addEventListener("click", () => {
        const piecesOrdonnees = Array.from(pieces);
        piecesOrdonnees.sort( function (a, b) {
            return b.prix - a.prix;
        });
        document.querySelector(".fiches").innerHTML = "";
        genererPieces(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");
 
    boutonFiltrer.addEventListener("click", function () {
        const piecesFiltrees = pieces.filter(function (piece) {
            return piece.prix <= 35;
        });
        document.querySelector(".fiches").innerHTML = "";
        genererPieces(piecesFiltrees);
});

const boutonFiltrerDescription = document.querySelector(".btn-filtrer-description");

    boutonFiltrerDescription.addEventListener("click", () => {
        const piecesFiltrees = pieces.filter(function (piece) {
            return piece.description 
        });
        document.querySelector(".fiches").innerHTML = "";
        genererPieces(piecesFiltrees);
});

// liste simplifiée contenant que les nom des éléments coutant moin de 35 €
const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i,1);
    }
}
//Création de l'en-tête
const pElement = document.createElement('p')
pElement.innerText = "Pièces abordables";

//Création de la liste
const abordablesElements = document.createElement('ul');

//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres (abordable)
document.querySelector('.abordables')
    .appendChild(pElement)
    .appendChild(abordablesElements)


// Crétion d'une liste simplifiée montrant le nom des pièces disponible + leur prix
const dispo = pieces.map(piece => piece.nom + " - " + piece.prix + " €");
    for(let i = pieces.length -1; i >= 0; i--) {
        if(pieces[i].disponibilite === false){
            dispo.splice(i,1);
        }
}

// l'en-tête
const pElementDisponible = document.createElement('p')
pElementDisponible.innerText = "Pièces disponibles:";

// Création de la liste disponible
const disponibleElement = document.createElement("ul");

//ajout de chaque nom et prix a la liste
for(let i=0; i < dispo.length ; i++){
    const dispoElement = document.createElement('li');
    dispoElement.innerText = dispo[i];
    disponibleElement.appendChild(dispoElement)
}

//Ajout de l'en-tête puis de la liste au bloc résultat filtres (disponible)
document.querySelector(".disponible").appendChild(pElementDisponible)
    .appendChild(disponibleElement)

    const inputPrixMax = document.getElementById("prixMax")
        inputPrixMax.addEventListener("input", () => {
            const piecesFiltrees = pieces.filter(function(piece) {
                return piece.prix <= inputPrixMax.value;
            });
            document.querySelector(".fiches").innerHTML = "";
            genererPieces(piecesFiltrees);
        })