choices = document.querySelectorAll('.button');


choices.forEach(choice => {
    choice.addEventListener('mouseenter', function() {
        this.classList.add('active');
    })
    choice.addEventListener('mouseleave', function() {
        this.classList.remove('active');
    })
});