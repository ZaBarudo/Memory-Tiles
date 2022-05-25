choices = document.querySelectorAll('li');
console.log(choices);

choices.forEach(choice => {
    choice.addEventListener('mouseenter', function() {
        this.classList.add('active');
    })
    choice.addEventListener('mouseleave', function() {
        this.classList.remove('active');
    })
});