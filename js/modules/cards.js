function cards() {

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

}

module.exports = cards;