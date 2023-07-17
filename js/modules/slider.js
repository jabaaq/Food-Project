function slider() {
    const prevBtn = document.querySelector('.offer__slider-prev'),
        nextBtn = document.querySelector('.offer__slider-next'),
        slider = document.querySelector('.offer__slider'),
        slides = document.querySelectorAll('.offer__slide'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;  //ამ ბრძანებით ვიგებ, რომელი სტილები იყო გამოყენებული ელემნტზე, შედეგად მიბრუნდება ობიექტი, სადაც ეს სტილები წერია და ბოლოს რომ ვწერ .width ამის  მეშვეობით, მოპოვებული სტილებიდან გამოვყოფ მხოლოდ width-ს (სიგანეს)

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;        //თუ სლაიდების რიცხვი ნაკლები ინქება 10-ზე მაშინ მას ვამატებ წინ 0-ს
        current.textContent = `0${slideIndex}`
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';  //სლაიდების რაოდენას ვამრავლებ 100%-ზე, რადგან იგი საიტზე დიდ ადგილს იკავებს და შესაბამისად ვჭიმავ მთელს სიგანეზე და ბოლოს ეს  '%' იმიტომ ვწერ, რომ css სტილები სხვანაირად ვერ გაიგებენ
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all'

    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = width; //შეიძლება ეს სლაიდები სხვადასხვა ზომის ყოფილიყო და ამ კოდით ყველას ერთი და იგივე ფართობს ვანიჭებ.
    })

    slider.style.position = 'relative';     //slider-ში არსებული ელემენტები ნორმალურად წარმოისახება.

    const indicators = document.createElement('ol'),    //ol - ordered list
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`;

    slider.append(indicators);      //slider-ს დავამატე ეს indicators

    //ახლა ქვემოთ უნდა შევქმნა სალიდების რაოდენობაზე დაყრდნობით წერტილები

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1)
        dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);

        dots.push(dot);     //dots მასივში, რომელიც ზემოთაა შექმნილი, ვამატებ ამ წერილს
    }

    function deleteNotDigits(str) {
        return +str.replace(/[^\d.]/g, '')
    }

    nextBtn.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {  //აქ უკვე ვიყნებ Regular Expressions(რეგულარული გამონათქვამებს) - /\D/g,
            offset = 0; //ეს იმას ნიშნავს, რომ გადავსქროლე ბოლომდე სლაიდი უნდა დავბრუნდეს დასაწყისში
        } else {
            offset += deleteNotDigits(width)
        }
        slidesField.style.transform = `translateX(-${offset}px) `//ღილაკზე დაჭერირას ელემენტი გადაინაცვლებს მარცხნივ და რადგანაც მარცხნივ გადადდის ვწერ უარყოფით რიცხვს  
        if (slideIndex == slides.length) {      //როდესაც სლაიდის რიცხვი გავა ბოლოში იგი გახდება ისევ ერთი
            slideIndex = 1;
        } else {
            slideIndex++;   //სლაიდის რიცხვი გაიზრდება ერთით
        }
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => {
            dot.style.opacity = '.5'
        })
        dots[slideIndex - 1].style.opacity = 1;
    })

    prevBtn.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1)
        } else {
            offset -= deleteNotDigits(width)
        }
        slidesField.style.transform = `translateX(-${offset}px) `

        if (slideIndex == 1) {      //როდესაც ვიმყოფები პირველ სლაიდზე და დავაჭერ წინა ღილაკს სლაიდის რიცხვი გადავა ბოლო საიტზე
            slideIndex = slides.length;
        } else {
            slideIndex--;       //უკანა ღილაკზე დაკლიკებისას სლაიდის რიცხვს ვამცირებ ერთით
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => {
            dot.style.opacity = '.5'
        })
        dots[slideIndex - 1].style.opacity = 1;

    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1)

            slidesField.style.transform = `translateX(-${offset}px) `

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[slideIndex - 1].style.opacity = 1;

        })
    })

}

module.exports = slider;