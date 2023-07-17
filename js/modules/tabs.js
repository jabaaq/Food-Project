function tabs() {
    //Tabs  

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {     //ვუთებ ინდექსს i -ის მეშვეობით
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent(); //თუ ეს ფუნქცია გამოვიძახე არგუმენტის გარეშე default-ად დაყენდება რაც ფუნქციას უწერია

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {     //გავარჩიე ტაბები
                if (target == item) {   // თუ თარგეთი დაემთხვა ტაბის item-ს
                    hideTabContent();           // მაშინ შექასრულოს ეს 2 ფუნქცია
                    showTabContent(i);
                }
            });
        }
    });

}


module.exports = tabs;