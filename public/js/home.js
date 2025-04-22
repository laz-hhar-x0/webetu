function changePage(pageNumber) {
  
    let pages = document.querySelectorAll('.page');
    pages.forEach(function(page) {
        page.style.display = 'none';
    });

    let bigImage = document.querySelector('.bigCari img');

    if (pageNumber === 2) {
        bigImage.classList.add('rotate-img');
    } else {
        bigImage.classList.remove('rotate-img');
    }

    switch (pageNumber) {
        case 1:
            document.getElementById('content1').style.display = 'block';
            break;
        case 2:
            document.getElementById('content2').style.display = 'block';
            break;
        case 3:
            document.getElementById('content3').style.display = 'block';
            break;
    }
}





function showContent(buttonNumber) {

    let buttons = document.querySelectorAll('.bottom-buttons button');
    buttons.forEach(function(button) {
        button.classList.remove('active');
    });


    document.querySelectorAll('.bottom-buttons button')[buttonNumber - 1].classList.add('active');

    changePage(buttonNumber);
}





const inputs = document.querySelectorAll("input, textarea");

inputs.forEach(input => {
  input.addEventListener("focus", () => {
    document.body.style.overflow = "hidden";
  });

  input.addEventListener("blur", () => {
    document.body.style.overflow = "auto";
  });
});




