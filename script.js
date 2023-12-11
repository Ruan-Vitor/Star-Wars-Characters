// Site referência:
// https://rodrigoserrasqueiro.github.io/Star-Wars-Characters/

// Fontes Star Wars
// https://www.cdnfonts.com/star-wars.font

let currentPageUrl = 'https://swapi.dev/api/people/'

window.onload = async () => {// Toda vez que a página recarregar essa função é chamada.
    try {
        await loadCharacters(currentPageUrl)
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage) //Monitorar eventos nesse elemento.
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; // Limpar os resultados anteriores. 
    // elemento.innerHTML modifica o HTML que está nesse elemento.

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div") //Cria uma tag html.
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
            // Usar uma expressão regular RegExp 
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = convertCharacterName(character.name) // Modifica o conteúdo de texto
            
            characterNameBG.appendChild(characterName) //Insere um filho dentro deste elemento.
            card.appendChild(characterNameBG)

            card.onclick = () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''

                const characterImage = document.createElement('div')
                characterImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = 'character-image'

                const name = document.createElement('span')
                name.className = 'character-details'
                name.innerText = `Nome: ${convertName(character.name)}`

                const characterHeight = document.createElement('span')
                characterHeight.className = 'character-details'
                characterHeight.innerText = `Altura: ${convertHeight(character.height)}`

                const mass = document.createElement('span')
                mass.className = 'character-details'
                mass.innerText = `Peso: ${convertMass(character.mass)}`

                const eyeColor = document.createElement('span')
                eyeColor.className = 'character-details'
                eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`

                const birthYear = document.createElement('span')
                birthYear.className = 'character-details'
                birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterHeight)
                modalContent.appendChild(mass)
                modalContent.appendChild(eyeColor)
                modalContent.appendChild(birthYear)

            }

            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next  // Se não houver mais páginas, o disabled next será habilitado.
        backButton.disabled = !responseJson.previous  // Se não houver mais páginas antes, idem para o disabled previous.

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        currentPageUrl = url

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar os personagens')
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }

}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}

function hideModal() {
    const modal = document.getElementById('modal')
    modal.style.visibility = 'hidden'
}

function convertEyeColor(eyeColor) {
    const cores = {
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        "blue-gray": "azul-acinzentada",
        unknown: "desconhecida"
    };

    return cores[eyeColor.toLowerCase()] || eyeColor;
}

function convertHeight(height) {
    if (height === "unknown") {
        return "desconhecida"
    }
    return `${(height / 100).toFixed(2)} m` ;
}

function convertMass(mass) {
    if (mass === "unknown") {
        return "desconhecido"
    }
    return `${mass} kg`
}

function convertBirthYear(birthYear) {
    if (birthYear === "unknown") {
        return "desconhecido"
    }
    return birthYear.toLowerCase();
}

function convertName(name) {
    return name.toLowerCase();
}

function convertCharacterName(characterName) {
    return characterName.toLowerCase();
}