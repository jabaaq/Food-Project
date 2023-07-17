/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
window.addEventListener('DOMContentLoaded', () => {

    const tabs = require('./modules/tabs'),
        modal = require('./modules/modal'),
        timer = require('./modules/timer'),
        slider = require('./modules/slider'),
        calc = require('./modules/calc'),
        cards = require('./modules/cards'),
        forms = require('./modules/forms');

    tabs();
    modal();
    timer();
    slider();
    calc();
    cards();
    forms();

    //TIMER




    //Modal












    //  ვიყენებ კლასებს კარტებისთვის 

    //აქ ერთი-ორი სიტყვით დავწერ, თუ რახდება ზემოთ დაწერილ კოდში: 'http://localhost:3000/menu' -ამ სერვერიდან ვიღებ მოთხოვნას, რომელსაც შეიცავს menu ( ეს menu არის db.json-ში), ეს არის ობიექტებისგან შემდგარი ობიექტი, რადგან ეს მასივია, გადავარჩევ მას forEach მეთოდით და ის ობიექტი რომელიც იყოფება მასში, ვახდენ მის დესტრუქტურიზაციას ცალ-ცალკე ნაწილებად, შემდეგ ზუსტად ამ ნაწილებს გადავცემ ჩემს new MenuCard კონსტრუქტორს, რომელიც ქმნის ახალ ბარათს საიტზე, და შემდეგ ეგრევე არენდერებს .render();

    //ზემოთ დაწერილ კოდს დავწერ ქვემოთ, მაგრამ ყკვე axios ბიბლიოთეკის გამოყენებით

    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({ img, altimg, title, descr, price }) => {
    //             new MenuCard(img, altimg, title, descr, price).render();
    //         });
    //     });

    // ზემოთ დაწერილი კოდის კიდევ ერთი მეთოდიც არის, მას დავწერ ქვემოთ კომენტარის სახით. მაგრამ ეს მეთოდი გამოიყენება მაშინ, როდესაც მინდა ერთხელ რაიმეს დამატება, ამ შემთხვევაში მინდა ბარათების დამატება საიტზე:

    /* 
      getResource('http://localhost:3000/menu')
        .then(data => createCard(data));
 
    function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const element = document.createElement('div');
 
            element.classList.add("menu__item");
 
            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `;
            document.querySelector(".menu .container").append(element);
        });
    }
 
    */


    //Forms


    //Slider




    //ქვემოთ წერია სლაიდის პირველი და უფრო მარტივი ვერსია ! (Open it)

    // showSlides(slideIndex);  // ვეუმბენი, რომ გამოჩხნდეს მხოლოდ პირველი სლაიდი, რადგან slideIndex არის 1-ის ტოლი

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;        //თუ სლაიდების რიცხვი ნაკლები ინქება 10-ზე მაშინ მას ვამატებ წინ 0-ს
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {        //თუ n იქნება სლაიდების რიცხვზე მეტი, მაშინ იგი გახდება 1 slideIndex = 1;
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {                       // თუ n ნაკლები იქნება 1-ე, მაშინ იგი გახდება slideIndex = slides.length; ანუ სლაიდების რიცხვის ტოლი იქნება
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');  //ყველა სლაიდს ვმალავ აქ

    //     slides[slideIndex - 1].style.display = 'block';   // გამოვაჩინე პირველი სლაიდი და -1 იმიტომ, რომ პროგრამირებაში ათვლა იწყება 0-დან

    //     if (slides.length < 10) {       //ღილაკზე დაკლიკებისას გაიზრდება სლაიდის რიცხვები, ან პირიქით, შემცირდება 
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex
    //     }

    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n)     //თუ n-ის მაგივრად მოდის 1 მაშინ პირდაპირ ემატება 1, ხოლო თუ მოდის -1 მაშინ აკლდება ეგრებე 1
    // }

    // prevBtn.addEventListener('click', () => {
    //     plusSlides(-1);         //previous ღილაკს როცა ეჭირება აკლდება 1
    // })

    // nextBtn.addEventListener('click', () => {
    //     plusSlides(1);         //next ღილაკს როცა ეჭირება იზრდება 1-ით
    // })

    //Calculator


    //Calculator

});


