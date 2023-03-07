const btns = document.querySelectorAll('button');
const addForm = document.querySelector('.option-form-add');
const updateForm = document.querySelector('.option-form-update');
const close = document.querySelectorAll('.close');
const infoContainer = document.querySelector('#info-body-container');
const updateBtn = document.querySelector('#update-btn');
const addBtn = document.querySelector('#add-btn');

//Items in forms *************

// Add Form
const itemTitle = document.querySelector('#title');
const itemDesc = document.querySelector('#description');
const itemImage = document.querySelector('#image');
const tableItems = [];
let obj;

// Update form
const upId = document.querySelector('#updated-id');
const upTitle = document.querySelector('#updated-title');
const upImage = document.querySelector('#updated-image');
const updesc = document.querySelector('#updated-description');

// shared object
let activeSelection = {
    id: '',
    title: '',
    image: '',
    desc: ''
};

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
            case 'Delete' :
                deleteItem(activeSelection).then(() => {
                    infoContainer.removeChild(infoContainer.querySelector(`tr[data-itemid = '${activeSelection.id}']`));
                    alert(`${activeSelection.title} has been deleted.`)
                }).catch(err => console.log(err))
                
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

addBtn.addEventListener('click', function(event) {
        event.preventDefault();
        let newItem = {
            title : itemTitle.value,
            description: itemDesc.value,
            image: itemImage.value
        }
        removeStyle() 
    //    renderItems(infoContainer.querySelectorAll('tr').length + 1, newItem);
        addItem(newItem)
        .then((data) => { 
            removeAllChildNodes(infoContainer);
            responseFunc(data)     
            itemTitle.value = '';
            itemDesc.value = '';
            itemImage.value = '';   
        }).catch(err => console.log(err));
        close[0].click();
    });

    updateBtn.addEventListener('click', function (event) {
        event.preventDefault();
    
        const updatedItem = {
            id: upId.value,
            title: upTitle.value, 
            image: upImage.value,
            description: updesc.value
        }

        updateItem(updatedItem)
        .then((data) => {
            removeAllChildNodes(infoContainer);
            responseFunc(data);
            removeStyle()
            close[1].click();
        })
        .catch(err => console.log(err));
    })

    
// render functions ***********************

function renderItems(num, obj) {
    const tr = document.createElement('tr');
    let contentHtml = `<th scope="row">${num}</th>
    <td><img class="item-image" src=${obj.image} alt=${obj.title}></td>
    <td>${obj.title}</td>
    <td>${obj.description}</td>`;
    tr.setAttribute('data-itemId', obj.id);

    tr.innerHTML = contentHtml;
    tableItems.push(tr);

    infoContainer.append(tr);
}

function updateFill(data) {
    upId.value = data.id;
    upTitle.value =  data.title;
    upImage.value =  data.image;
    updesc.value = data.desc;
} 

function responseFunc(data) {
   

        for(const item in data) {
            renderItems(+item + 1, data[item])
        }

        tableItems.forEach(item => {
            item.addEventListener('click', function(){

              removeStyle()
              item.style.border = '1px solid #b63636';
              item.style.color = '#b63636';
              
              let content = item.querySelectorAll('td');
              activeSelection.id = item.getAttribute('data-itemid');
              activeSelection.title = content[1].innerText;
              activeSelection.image =  content[0].querySelector('img').src;
              activeSelection.desc =  content[2].innerText;

              updateFill(activeSelection);
            })
        })
}
    

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function removeStyle() {
    for(let index = 0; index < tableItems.length; index++) {
        tableItems[index].removeAttribute('style');
      }
    activeSelection.id = '';
    activeSelection.title = '';
    activeSelection.image = '';
    activeSelection.desc = '';
}

// Fetch methods ******************************

(async function pullItems() {
    const response = await fetch('/api/items')  
    .then((response) => response.json())
    .then((data) => {
        responseFunc(data)
    })
})() 

async function addItem(data) {
   const response = await fetch('/api/item/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
    });
    return response.json()

}  

async function deleteItem(data) {
    const response = await fetch(`/api/item/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer", 
        });
        return response.json()
}

async function updateItem(data) {
    const response = await fetch(`/api/item/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data) 
        });
        return response.json()
}