const btns = document.querySelectorAll('button');
const addForm = document.querySelector('.option-form-add');
const updateForm = document.querySelector('.option-form-update');
const close = document.querySelectorAll('.close');
const infoContainer = document.querySelector('#info-body-container');
const addBtn = document.querySelector('#add-btn');
const updateBtn = document.querySelector('#update-btn');

// Event listeners for forms *********************
btns.forEach(x => {
    x.addEventListener('click', (event) => {
        let button = event.target;
        switch (button.innerText) {
            case 'Add' :
                addForm.style.transform = 'translate(-50%, -52%)';
                addForm.style.opacity = 1;
            break;
            case 'Update' :
                updateForm.style.transform = 'translate(-50%, -52%)';
                updateForm.style.opacity = 1;
            break;
            default: 
            console.log('end')
            break;
            
        }
    })
});
close.forEach(x => {
    x.addEventListener('click', (event) => {
        const button = event.target;
        for(let index = 0; index < close.length; index++) {
            if(addForm.hasAttribute('style') && button === close[0]) {
                addForm.removeAttribute('style');
            } else {
                updateForm.removeAttribute('style');
            }
        }
    })
});

// render function ***********************

function renderItems(num, obj) {
    const tr = document.createElement('tr');
    let contentHtml = `<th scope="row">${num}</th>
    <td><img class="item-image" src=${obj.image} alt=${obj.title}></td>
    <td>${obj.title}</td>
    <td>${obj.description}</td>`;
    tr.setAttribute('data-itemId', obj.id);

    tr.innerHTML = contentHtml;

    infoContainer.append(tr);
}


// Fetch method ******************************

let dataPull = fetch('/api/items')  
    .then((response) => response.json())
    .then((data) => {

        for(const item in data) {
            renderItems(+item + 1, data[item])
        }

    })
    .catch(err => console.log(err));
