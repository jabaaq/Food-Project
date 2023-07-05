/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
window.addEventListener('DOMContentLoaded', () => {

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


    //TIMER


    const deadline = '2023-07-10';

    function underZero(num) {
        if (num < 0) {
            num = 0;
        }
        return num;
    }

    function getTimeRemaining(endtime) {  //ვქმნი ფუქნციას რომ მივიღო სხვაობა დედლაიის ახლანდელ დროსთან
        const t = underZero(Date.parse(endtime) - Date.parse(new Date())),  /* როდესაც ფუნქცია გაიშვება, მივიღებ სხვაობას
    endtime-სა და დღევანდელ დროს new Date() შორის მილიწამებში */
            days = Math.floor(t / (1000 * 60 * 60 * 24)), /* ვანაგრიშობ დღეებს, ზემოთ მიღებულ სხვაობას, ანუ t-ს ვყობ 1 დღეში არსებულ მილიწამებზე და ვამრგვალებ  Math.floor()-ით */
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), /* % 24 იმიტომ, რომ საიტზე წამზომი არ გაცდეს 24 საათს და თუ გაცდა გადავიდეს დღეებში */
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);



        //რადგან ეს ცვლადები ფუნქციაშია, ახლა ვიზამ ისე, რომ ისინი ფუქნციის გარეთ მივიღო

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    function getZero(num) {         // ამ ფუნქციის მეშვეობით ტაიმერში აქამდე თუ ეწერება: 8 დღე, 6 საათი, 48 წუთი, 9 წამი
        if (num >= 0 && num < 10) {                                     // ახლა ეწერება: 08 დღე, 06 საათი, 48 წუთი, 09 წამი ..
            return `0${num}`;                               // ანუ თუ რიცხვი 10-ზე დაბლაა მას წინ დაეწერება 0
        } else {
            return num;
        }
    }

    //რადგან ეს ყველაფერი დავასრულე, ახლა დავწერ ფუნქციას, რომელიც დააყენებს ტაიმერს პირდაპირ საიტზე

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);   //ვიყენებ setInterval-ს რომ ყოველ წამს გამოიძახოს updateClock ფუნქცია

        updateClock();  /*ფუნქციას ვიძახებ თავში რადგან HTML კოდი ვერ ასწრებს ჩატვირთვას და ჯერ მაჩვენებს HTMLკოდში მითითებულ მნიშვნელობებს
        ახლა კი ყველაფერი გამოსწორდება*/

        // ახლა ვქმნი ფუნქციას, რომელიც განაახლებს ტაიმერს ყოველ წამს
        function updateClock() {
            const t = getTimeRemaining(endtime);
            /*მოცემულ t ცვლადში იწერება getTimeRemaining-ის რეზულტატი, მისი რეზულტატი კი არის ობიექტი სხვადასხვა თვისებებით */
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {   // როდესაც t.total დასრულდება, ანუ ჩამოვა ტაიმერი 0-მდე 
                clearInterval(timeInterval);        // timeInterval შეწყვეტს მუშაობას და შესაბამისად  updateClock ფუნცქცია აღარ გამოძახდება
            }
        };
    }

    setClock('.timer', deadline);


    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
    // modalCloseBtn = document.querySelectorAll('[data-close]'); //მოცემული ბრძანება არ იმოქმედებს ყველა ღილაკზე, თუნდაც იმათზე, რომელიც შეიქმნა დინამიურად, ანუ შეიქმნა ჯავასქრიპტში, ამიტომ მას წავშლი და ქვემოთ დავწერ სწორ ფორმას

    function openModal() {      // აქაც უბრალოდ ვიცავ DRY წესს
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId); //ერთხელ რომ გაიხსნება მოდალური ფანჯარა, მეორეჯერ აღარ გაიხსნება, ანუ არ მოაბეზრებს მომხმარებელს
    }

    modalTrigger.forEach(btn => {               //გადავარიე სათითაოდ კნოპკები, რომ იმუშაოს მოდალურმა ფანჯარამ, ანუ პირდაპირ ვერ გავაკეთებდი
        btn.addEventListener('click', openModal);
    });


    function closeModal() {    // რადგან closeModal()-ში არსებული კოდის რამოდენიმეჯერ გამოყენება მიწევდა იგი ვაქციე ფუნქციად  
        modal.classList.add('hide');        //რომ არ დავუშვლა DRY (Don't Repeat Youreself)  შეცდომა
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }




    // modalCloseBtn.forEach(closeBtn => {     //აქაც ზუსტად იგივე გავაკე, მაგარამ ჯერ querySelectorAll გადავაკეთე, ეს მახსოვდეს!
    //     closeBtn.addEventListener('click', closeModal); // ვამატებ ფუნქციას closeModal-ს ფრჩხილების გარეშე 
    // });


    modal.addEventListener('click', (e) => {        // აქ ვამატებ ბრძანებას, რომ მოდალური ფანჯარა დავხურო უკანა ფონზე დაკლიკებისას
        if (e.target === modal || e.target.getAtrribute('data-close') == '') {       //e.target-ით მივიღებ მონაცემებს, თუ სად ვაკლიკებ და თუ იგი დაემთხვა modal-ს, მაშინ მას ვხურავ
            closeModal();       // აქ კი ვამატებ ფუნქციას closeModal()-ს უკვე ფრჩხილებით
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {  //e.code-ის მეშვეობით, ვუთითებ, რომ ეს ღილაკი უნდა იყოს Escape
            closeModal();       //და აქცე ზემოთ ვუთითებ, რომ თუ modal შეიცავს კლასს show-ს მაშინ იმოქმედეოს Escape ღილაკმა
        }                          // ეს გავაკეთე იმიტომ, რომ ყოველჯერზე და Escape-ზე დაკლიკებბისას არ ამუშვდეს closeModal(); ფუნქცია  
    });

    const modalTimerId = setTimeout(openModal, 50000);

    // window.addEventListener('scroll', () => {
    //     if (window.pageYOffset + document.documentElement.clientHeight <= document.documentElement.scrollHeight - 1);  /*ბოლომდე ჩასქროლილ საიტს ვადარებ მთელი საიტის სიგრძეს და საიტის დასრულებამდე სანამ დარჩება 1 პიქსელი (რადგან სიზუსტისთვის, მიწერია -1) ამომიგდებს მოდალურ ფანჯარას*/
    //     openModal();
    // });

    function ShowModalByScroll() {
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', ShowModalByScroll);
        }
    }

    window.addEventListener('scroll', ShowModalByScroll);



    //  ვიყენებ კლასებს კარტებისთვის 

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) { //parentSelector მოვიპოვებ მშობელს, სადაც ამ ყველაფერს შევტენი
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;     //არ დამავიწყდეს, რომ ეს იქნება მასივი
            this.parent = document.querySelector(parentSelector);  // მასში დევს ახლა DOM ელემენტი, რომელსაც ქვემოთ გამოვიყენებ
            this.transfer = 37;
            this.changeToUAH();  // მოცემულ მეთოდს ვიძახებ აქვე, კონსტრუქტორში
        }
        changeToUAH() {
            this.price = this.price * this.transfer;        //მონაცემები მოდის დოლარებში და მე გადამყავს გრივნებში
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {  //ვაყენებ default პარამეტრს
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {                        //აქ ქვემოთ element არის 'div' და 
                this.classes.forEach(className => element.classList.add(className));
                // რადგან this.classes არის მასივი, ვამუშავებ მას და ბოლოს ვუკავშირებ 'div'-ს
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr"> ${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>         
        `;                          // აქ ზემოთ this.price-ში უკვე მოდიფიცირებული თანხა დაიწერება,ანუ გრივნებში გადაყვანილი
            this.parent.append(element); // რადგან იგი DOM ელემენტი მასზე გამოიყენება მეთოდი append();
        }
    }


    const getResource = async (url) => {    //ამ ფუნქციას მერე გამოვიძახებ
        const res = await fetch(url);
        if (!res.ok) {  // ანუ აქ ჩემს მოთხოვნაში რაღაც არ წავიდა კარგად, უნდა გადმოვაგდო რაღაც შეცდომა და როცა შეცდომის ხელით გადმოგდება ხდება, ესეიგი მუშავდება .catch მეთოდი. 
            throw new Error(`Could not fetch ${url}, status: ${res.status} `)
        }
        return await res.json();
    }



    getResource('http://localhost:3000/menu')   //აქ ვიყენებ ზემოთ დაწერილ ფუნქციას და ახლა მას დავამუშავებ:
        .then(data => {     //data არის სერვერიდან მოსული მონაცემები
            data.forEach(({ img, altimg, title, descr, price }) => {  //აქ {}-ებში მიწერია ობიექტის დესტრუქტურიზაცია
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render(); //ვიძახებ კონსტრუქტორ MenuCard-ს. ეს კონსტრუქტორი შეიქმენა იმდენჯერ, რამდენი ობიექტიც მექნება სერვერიდნა მოსულ მასივში
            });                                            // ვიდეოში new MenuCard -ში ბოლოს მითითა '.menu .container'
        });

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

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        succes: 'Спасибо! Скоро мы с вамы свяжемся!!!',
        failure: 'Что-то пошло не так...'


    };

    forms.forEach(item => {         // forEach-ის მეშვეობით თითოეულ form-ს რომელიც არის HTML დოკუმენტში, ვუმატებ postData-ს.
        bindPostData(item);
    });

    //აქ ქვემოთ data მონაცემები, რომელთა დაპოსტვაც მოხდება ამ ფუნქციაში
    const postData = async (url, data) => {        //რა ხდება ახლა ამ postData ფუნქციაში, ალაგენს(აყენებს) ჩვენს მოთხოვნავს. შემდეგ ხდება ამ მოთხოვნის 
        const res = await fetch(url, {          // და-fetch-ვა, ანუ ეს მოთხოვნა იგზავნება სერვერზე, შემდეგ ვიღებ რაღაც პასუხს სერვერიდან (თუნდაც ის, რომ
            method: "POST",                 // დაიპოსტა წარმატებიტ) და ბოლოს ხდება ამ პასუხის ტრანსფორმირება json-ში
            headers: {
                'Content-type': 'application/json'          //ამას ვწერ, რადგან მე-300 ხაზის მიხედვით JSON ფორმატთან გვაქვს საქმე
            },
            body: data
        })

        return await res.json();  //აქ ბრუნდება promise, რომლის დამუშვებაც შემიძლია .then -ით
    }



    function bindPostData(form) {
        form.addEventListener('submit', (e) => {         //submit მოვლენა მუშავდება ყოველ ჯერზე როცა ვცდილობთ რაიმე ფორმის გაგზავნას
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `     
                dislay: block;
                margin: 0 auto;
            `   //cssTextt უბრალოდ ვამატებ ელემენტს სტილებს
            form.insertAdjacentElement('afterend', statusMessage);     //აქ ფორმას ვუმატებთ ამ არცთუ ისე დიდ მესიჯს



            // request.setRequestHeader('Content-type', 'application/json;');  //მონაცემების მიღება მინდა json-ით, ამიტომ: 'application/json'
            const formData = new FormData(form);        //formData-ს მეშვეობით ვაგროვებთ მონაცემებს (ქვემოთ გაგრძელება fetch-ზე)


            //ქვემოთ დაწერილი formData-ს უფრო ელეგანტურად დაწერის ხერხს დავწერ ახლა, ანუ ამ formData გადაქცევა Json-ად, მაგრამ formData-ს მაინც დავტოვებ კომენტარებში

            const json = JSON.stringify(Object.fromEntries(formData.entries())); // აქ formData-სგან აღებულ მონაცემებს ჯერ გადავაქცევს მასივად, რომელიც შედგება მასივებისგან, ანუ formData.entries(), შემდეგ ამ ყველაფერს ვფუთავ ისევ ობიექტად Object.fromEntries და ბოლოს ამ კლასიკურ ობიექტს ვაქცევ JSON-ად, ანუ ამ ყველაფერს ვფუთად JSON.stringify()-ში. ამ json-ს კი ვაგზავნი სერვერზე 335-ხაზზე**

            // const object = {};
            // formData.forEach(function (value, key) {
            //     object[key] = value;
            // });


            // fetch('server.php', {               // fetch-ის მეშვეობით კი ვაგზავნით ამ შეგროვილ მონაცემებს
            //     method: "POST",
            //     headers: {
            //         'Content-type': 'application/json'          //ამას ვწერ, რადგან მე-300 ხაზის მიხედვით JSON ფორმატთან გვაქვს საქმე
            //     },
            //     body: JSON.stringify(object)
            // })

            postData('http://localhost:3000/requests', json) // ზემოთ დაკომენტარებული კოდი გადმოვიტანე აქ
                // ეს ლინკი ზემოთ არის json სერვერის ლინკი, რომელიც ავიღე ტერმინალიდან 

                // .then(data => data.text())  //ამას ვშლი (ნუ, მე ვაკომენტარებ) რადდგან იგი ზემოთ postData ფუქნციაში მაქვს დამალული
                .then(data => {
                    console.log(data);  // აქ request.response-ის ნაცვლად ჩავწერე data. ანუ  data ის მონაცემებია, რომელიც ბრუნდება promise-დან
                    showThanksModal(message.succes);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();       // ამას ვწერ finally-ში, რადგან იგი უნდა მოხდეს ნებისმიერ შემთხევაში
                })
            /*რადგანდ დავწერე fetch, ახლა მჭირდება ჩემი მოთხოვნის დამუშავება. ქვემოთ კომენტარებში დავტოვებ request.addEventListener-ს, რადგან მახსოვდეს თუ აქამდე როგორ ხდებოდა მოთხოვნის დამუშავება და ახლა კი დავწერ ახალ მეთოდს და რადგან საქმე მაქცს promise-ებთან ამიტომაც გამოვიყენებ .then მეთოდს (რადგან fetch კონსტრუქტორიდან ბრუნდებქა promise-ები)*/

            /*!!!!ახლა აქ ზემოთ რაც დავწერე, ყველაფერი მუშაობს იდეალურად, მაგრამ დამრჩა ბოლო დეტალი, რომ მონაცემთა ფორმატი გავაგზავნო 
            JSON ფორმატით, ამიტომაც სულ ზემოთ 300 ხაზზე body-ს formData-ს მაგივრად გადავცემ JSON.stringify(object) */

            // request.addEventListener('load', () => {        //load მოთხოვნის საბოლოო დასრულება
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.succes);
            //         form.reset();
            //          statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) { //როდესაც მომხარებელი თავის ინფორმაციას შეიყვანს, იმნფორმაციის მოდალი დაიხურება და სხვა გაიხსნება 
        const prevModalDialog = document.querySelector('.modal__dialog');      //მოვიპოვებ ამ მოდალს

        prevModalDialog.classList.add('hide');      //ვუმატებ კლასს hide, რომლის გააქტიურებისასაც ხამალავს მასს
        openModal();

        const thanksModal = document.createElement('div');      // ვამატემ ელემენტს
        thanksModal.classList.add('modal__dialog');      // ვამატებ კლასს და ერთ modal__dialog-ს ვანაცვლებ მეორეთი
        thanksModal.innerHTML = `
        <div class= 'modal__content'> 
          <div class="modal__close" data-close>×</div>
          <div class="modal__title">${message}</div>
        </div>
        `;
        ''
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }


    fetch('http://localhost:3000/menu')  //აქედან მიბრუნებდა promise და ამიტომაც დავამუშავებ მას .then -ით
        .then(data => data.json()) //ვეუბნები, რომ ავიღებ ამ პასუხს სერვერიდან, ანუ data-ს და გადავაქცევ ჯავასკრიპტ ობიექტად
    // .then(res => console.log(res));

    //Slider

    const prevBtn = document.querySelector('.offer__slider-prev'),
        nextBtn = document.querySelector('.offer__slider-next'),
        slides = document.querySelectorAll('.offer__slide'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;  //ამ ბრძანებით ვიგებ, რომელი სტილები იყო გამოყენებული ელემნტზე, შედეგად მიბრუნდება ობიექტი, სადაც ეს სტილები წერია და ბოლოს რომ ვწერ .width ამის  მეშვეობით, მოპოვებული სტილებიდან გამოვყოფ მხოლოდ width-ს (სიგანეს)

    let slideIndex = 1;

    slidesField.style.width = 100 * slides.length + '%';  //სლაიდების რაოდენას ვამრავლებ 100%-ზე, რადგან იგი საიტზე დიდ ადგილს იკავებს და შესაბამისად ვჭიმავ მთელს სიგანეზე და ბოლოს ეს  '%' იმიტომ ვწერ, რომ css სტილები სხვანაირად ვერ გაიგებენ
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all'

    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = width; //შეიძლება ეს სლაიდები სხვადასხვა ზომის ყოფილიყო და ამ კოდით ყველას ერთი და იგივე ზომას ვანიჭებ.
    })


    //ქვემოთ წერია სლაიდის პირველი და უფრო მარტივი ვერსია

    // showSlides(slideIndex);  // ვეუმბენი, რომ გამოჩხნდეს მხოლოდ პირველი სლაიდი

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

});


