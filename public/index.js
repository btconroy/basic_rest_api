const btns = document.querySelectorAll('button');
const addForm = document.querySelector('.option-form-add');
const updateForm = document.querySelector('.option-form-update');
const close = document.querySelectorAll('.close');

btns.forEach(x => {
    x.addEventListener('click', (event) => {
        let button = event.target;
        switch (button.innerText) {
            case 'Add' :
                addForm.style.transform = 'translate(-50%, -20%)';
            break;
            case 'Update' :
                updateForm.style.transform = 'translate(-50%, -20%)';
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
})