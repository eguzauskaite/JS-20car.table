// Instrukcijos
// BASE URL = https://open-long-puck.glitch.me

// [{"brand":"Tesla","model":"Model S","image":"https://www.auto-data.net/images/f68/Tesla-Model-S_1.jpg"},{"brand":"BMW","model":"3 Series","image":"https://www.auto-data.net/images/f21/BMW-3er-Sedan-G20_thumb.jpg"},{"brand":"Audi","model":"A4","image":"https://www.auto-data.net/images/f5/thumb4391922.jpg"},{"brand":"Mercedes-Benz","model":"C-Class","image":"https://www.auto-data.net/images/f5/thumb529039.jpg"},{"brand":"Porsche","model":"911","image":"https://www.auto-data.net/images/f126/Porsche-911-Targa-992.jpg"},{"brand":"Audi","model":"A6"},{"brand":"Audi","model":"A6"},{"brand":"Audi","model":"A6"}]

// Sukurkite puslapį, index.html, kurį užkrovus atsiranda lentelė su visais automobiliais iš base URL.
// Sukurkite papildomą puslapį, add.html, kuriame būtų forma su dviem inputais - brand ir model; šie paduotų su post'u informaciją į base url (formatas: objektas su dviem properties: brand ir model).
// Sukurkite notification - t.y. sėkmingai užpildžius formą ir gavus patvirtinimą, turi virš formos rašyti, kad duomenys sėkmingai išsaugoti; o jei blogai - išmesti errorą.
// Sukurkite navigaciją, kad galėtumėte tarp puslapių vaikščioti ir patikrinkite ar įrašyti duomenys atsivaizduoja :)


document.addEventListener('DOMContentLoaded', function () {
    // Gaukite lentelės elementą
    const carTable = document.getElementById('carTable');
    const carForm = document.getElementById('carForm');
    const notification = document.getElementById('notification');


    //   Ištraukia automobilių sąrašą iš base URL
     fetch('https://open-long-puck.glitch.me')
         .then(response => response.json())
         .then(data => {
             // Užpildo lentelę su gautais automobiliais
             data.forEach(car => {
                 const row = carTable.insertRow();
                const brandCell = row.insertCell(0);
                const modelCell = row.insertCell(1);
                const imageCell = row.insertCell(2);

                 brandCell.innerText = car.brand;
                modelCell.innerText = car.model;

                 if (car.image) {
                     const image = document.createElement('img');
                    image.src = car.image;
                     image.alt = `${car.brand} ${car.model}`;
                    imageCell.appendChild(image);
                 }
             });
        })
        .catch(error => {
            console.error('Klaida:', error);
         });
 });


    carForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const brand = document.getElementById('brand').value;
        const model = document.getElementById('model').value;

        fetch('https://open-long-puck.glitch.me', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ brand: brand.toLowerCase(), model: model.toLowerCase() }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Sėkmingo užpildymo pranešimas
                notification.innerText = 'Duomenys sėkmingai išsaugoti.';
                notification.style.color = 'green'; 
            } else {
                // Klaidos pranešimas
                notification.innerText = 'Klaida: duomenys nebuvo išsaugoti. Bandykite dar kartą.';
                notification.style.color = 'red'; 
            }
        })
        .catch(error => {
            console.error('Klaida:', error);
      })
        .finally(() => {
            // Išvalo laukus po užklausos
            carForm.reset();
            // Atnaujina lentelę  po sėkmingo išsaugojimo
            if (notification.style.color === 'green') {
                updateTable();
            }
        })
    })

    
    
 
       

   