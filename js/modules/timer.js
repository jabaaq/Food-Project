function timer() {
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

}

module.exports = timer;