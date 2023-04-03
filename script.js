let jsonData = {};
let xmlDoc;

const jsonUrl = 'https://eecs.csuohio.edu/~keminn/Project4/JSONData/YelpOneBusinessJsonData.json';
const xmlUrl = 'https://eecs.csuohio.edu/~keminn/Project4/JSONData/restaurant_menu.xml';

fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
        jsonData = data;
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });

fetch(xmlUrl)
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        xmlDoc = parser.parseFromString(data, "application/xml");
    })
    .catch(error => {
        console.error('Error fetching XML data:', error);
    });

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function menuFunction() {
    document.getElementById("menuDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function displayInfo(type) {
    const container = document.getElementById('info-container');
    let content = '';

    switch (type) {
        case 'name':
            content = `<h2>${jsonData.name}</h2>`;
            break;
        case 'address':
            content = `<p>${jsonData.full_address}</p>`;
            break;
        case 'businesshours':
            content = '<h2 class="hrs">Hours</h2><ul class="hours-list">';
            for (const day in jsonData.hours) {
                content += `<li>${day} <br> ${jsonData.hours[day].open} - ${jsonData.hours[day].close}</li>`;
            }
            content += '</ul>';
            break;
        case 'servicesAndFeatures':
            content = '<table><thead><tr><th><h2>Services and Features</h2></th></tr></thead><tbody>';
            for (const attr in jsonData.attributes) {
                if (jsonData.attributes[attr] === true) {
                    content += `<tr><td>${attr}</td></tr>`;
                }
            }
            content += '</tbody></table>';
            break;
    }

    const section = document.createElement('section');
    section.innerHTML = content;
    container.appendChild(section);
}
function displayMenu(menuType) {
    const container = document.getElementById('menu-container');
    let content = `<h2>${menuType}</h2>`;
    let items = xmlDoc.getElementsByTagName(menuType)[0].childNodes;
    let currentCategory = '';

    content += '<table><thead><tr><th>Category</th><th>Name</th><th>Price</th></tr></thead><tbody>';

    for (let i = 0; i < items.length; i++) {
        if (items[i].nodeType === 1) { // Check if the node is an element
            let category = items[i].nodeName;
            if (currentCategory !== category) {
                currentCategory = category;
            } else {
                category = '';
            }

            content += `<tr>
                            <td>${category}</td>
                            <td>${items[i].getElementsByTagName('NAME')[0].textContent}</td>
                            <td>${items[i].getElementsByTagName('PRICE')[0].textContent}</td>
                        </tr>`;
        }
    }

    content += '</tbody></table>';

    const section = document.createElement('section');
    section.innerHTML = content;
    container.innerHTML = '';
    container.appendChild(section);
}
