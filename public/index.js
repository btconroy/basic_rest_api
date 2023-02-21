const btns = document.querySelectorAll('button');


btns.forEach(x => {
    x.addEventListener('click', () => {
        alert('It Works');
    })
});