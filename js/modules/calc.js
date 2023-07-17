function calc() {
    const result = document.querySelector('.calculating__result span')      //კლასსთან ერთად მოვიპოვებ span-ს

    let sex, height, weight, age, ratio;

    //აქ ქვემოთ ვწერ პირობას, რომ თუ localStorag-ში უკვე არის რაიმე ინფორმაცია, მაშინ ამ ინფორმაციას იქიდან ავიღებთ და ჩავდებთ ქვემოთ,  sex და ratio-ში,თუ არადა დავტოვებ ისევ default მნიშვნელობებს ისე, როგორც აქამდე იყო

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = "female";     //თუ localStorage არ იყო ინფრომაცია, მაშინ sex-ს ის default იქნება "female"
        localStorage.setItem('sex', 'female')
    }


    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = "1.375";     //თუ localStorage არ იყო ინფრომაცია, მაშინ sex-ს ის default იქნება "female"
        localStorage.setItem('retio', '1.375')
    }

    //ქვემოთ შევქმნი ფუნციას, რომლის მიხედვითაც გავაკონტროლებ კალკუატორის ელემენტებს, საიტზე შესვლიას, ჯერ იქნება default მნიშნელობები არცეული, მას შემდეგ რაც უკვე მომხარებელი აირჩევს ელემენტებს საიტის გადატვირთვისას ის ელემენტები დარჩება არჩეული

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        // ახლა როგორია ამ ფუნქციის ალგორითმი. ავიღებ ამ ელემენტის div-ებს და მათ შემდეგ გადავარჩევ. ჯერ როცა საიტზე შევდივარ, ყველა ღილაკს მოვაშორებ ჯერ აქტივობის კლასს, ყველა რომ სუფთა იყოს და შემდეგ აქტივობის კლასს მივანიჭებ იმ ელემენტს, რომელიც შეესაბამება მნიშვნელობას localStorage-დან

        elements.forEach(elem => {
            elem.classList.remove(activeClass); //ელემენტებს ვაშორებ აქტივობის კლასს

            if (elem.getAttribute('id') === localStorage.getItem('sex')) {  //თუ ელემენტის ატრიბუტი იგივეა, რაც localStorage-ის ინფორმაცია
                elem.classList.add(activeClass);    //მას ვანიჭებ აქტივობის კლასს
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')

    function clalcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {  //თუ რომელიმე არ იქნება მითითებული
            result.textContent = '____';
            return; //return ამას ვწერ იმისთვის, რომ მალევე შეწყდეს ფუნქცია და მომდევნო ფუქნციები არ განხორციელდეს, იმ შემთხვევაში თუ არ მექნება მითითებული რაიმე, ზემოთ ჩამოთვლითაგან
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio);
        }
    }
    clalcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector); //რადგან მინდა div მოპოვება თითოეული მშობლის, ამიტომაც ვწერ ასე  

        elements.forEach(elem => {      //თითოეულ ელემენტს ვანიჭებ eventlistener-ს
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {  //თუ ასეთი ატრიბუტი data-ratio გააჩნია ელემენტს, მაშინ.... 
                    ratio = +e.target.getAttribute('data-ratio'); //ეს იმას ნიშნავს, რომ თუ მომხმმარებელი დააკლიკებს ვთქვათ Умеренная активность-ს ჩვენ ვდგებით და ვიღებთ იმ მნიშვნელობას, რაც უყენია data ატრიბუტი
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));//როდესაც ამ ელემენტებს ვაკლიკებ, ინფორმაცია ინახება localStorageში
                } else {
                    sex = e.target.getAttribute('id');   //თუ ელემენტს არ გააჩნია data ატრიბუტი მოვიპოვებ მის აიდის, ქალის თუ კაცი
                    localStorage.setItem('sex', e.target.getAttribute('id')); //აქაც იგივე, როცა ელემნტებს ვაკლიებ, ინფორმაცია ინახება localStorage-ში   
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass)

                clalcTotal();
            })
        })
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {       //ანუ თუ ჩაწრილი რიცხვები არ ემთხვევა ამ regular expressions შეიცვლება ბორდერი წითლად
                input.style.border = '1px solid red'
            } else {
                input.style.border = 'none'
            }

            switch (input.getAttribute('id')) {     //ის ორიენტირდება აიდიზე და ამ ჩაწერს ამ მონაცემებს განსაზღვრულ ცვლადებში: height, case, weight
                case 'height':
                    height = +input.value //თუ მართლა არის სიმაღლის ინპუტი, მაშინ ვიღებ ამ ცვლადს და ვწერ მასში იმ მნიშნველობას, რასაც წერს მომხმარებელი
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            clalcTotal();       //მოცემულ ფუნქციას ვიძახებ არაერთხელ, რადგან მინდა, რომ შედეგი ყოველთვის ახლდებოდეს, არ აქვს მომხარებელს შეყავს ინფორმაცია, თი პირიქით, შლის. ბოლოში Ваша суточная норма калорий:-ში ყოველთვის უნდა ახლდეობდეს ინფრომაცია
        })

    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

};


module.exports = calc;