function switchTab(tab){
    const characterInput = document.getElementById("CharacterInput")
    const speciesInput = document.getElementById("SpeciesInput")
    const characterImage = document.getElementById("characterImage")
    const speciesImage = document.getElementById("speciesImage")
    const characterTab = document.getElementById("charactersTab")
    const speciesTab = document.getElementById("speciesTab")
    const result = document.getElementById("result")

//tab functionality 
    result.innerHTML = '';
    if(tab==='Character'){
        characterInput.style.display = "block"
        characterImage.style.display ="inline"

        speciesInput.style.display = 'none'
        speciesImage.style.display='none'

        document.getElementById('CharacterID').value = '';

        characterTab.classList.add('active');
        speciesTab.classList.remove('active');
        
    } else if (tab === 'Species'){
        speciesInput.style.display = 'block'
        speciesImage.style.display = 'inline'

        characterInput.style.display = "none"
        characterImage.style.display = "none"

        document.getElementById('SpeciesID').value = '';

        speciesTab.classList.add('active');
        characterTab.classList.remove('active')

    }
}


//API call for Characters
function fetchPeopleInfo(){
    const characterID= document.getElementById('CharacterID').value;
    const result = document.getElementById('result');

    //handle when user enters a non value 
    if(!characterID){
        result.innerHTML = 'Error: Use table below!'
        return
    }

    fetch(`https://www.swapi.tech/api/people/${characterID}`)
        .then(res => res.json())
        .then(data => {
            if (data.result) {
                const characterAttributes = data.result.properties;
                result.innerHTML = `
                    <h2>Character Information</h2>
                    <p><strong>Name:</strong> ${characterAttributes.name}</p>
                    <p><strong>Height:</strong> ${characterAttributes.height} cm</p>
                    <p><strong>Mass:</strong> ${characterAttributes.mass} kg</p>
                    <p><strong>Hair Color:</strong> ${characterAttributes.hair_color}</p>
                    <p><strong>Skin Color:</strong> ${characterAttributes.skin_color}</p>
                `;
            } else {
             result.innerHTML = `<p>Error: Character not found</p>` // user does not enter range of 1-10
            }
        })   
        .catch(err => {
            console.error(err);
            result.innerHTML = '<p>Error: Could not retrieve data at this time</p>'
        });
}

//API call for Species
function fetchSpeciesInfo(){
    const speciesID= document.getElementById('SpeciesID').value;
    const result = document.getElementById('result');

    if(!speciesID){
        result.innerHTML = 'Error: Use table below!'
        return
    }

    fetch(`https://www.swapi.tech/api/species/${speciesID}`)
        .then(res => res.json())
        .then(data => {
            if (data.result) {
                const characterAttributes = data.result.properties;
                result.innerHTML = `
                    <h2>Species Information</h2>
                    <p><strong>Name:</strong> ${characterAttributes.name}</p>
                    <p><strong>Classification:</strong> ${characterAttributes.classification}</p>
                    <p><strong>Average Lifespan:</strong> ${characterAttributes.average_lifespan} years</p>
                    <p><strong>Language:</strong> ${characterAttributes.language}</p>
                `;
            } else {
             result.innerHTML = '<p>Error: Species not found</p>'//user does not enter range of 1-10
            }
        })   
        .catch(err => {
        console.error(err);
        result.innerHTML = '<p>Error: Could not retrieve data at this time</p>'
        });
}





