function forms() {
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

}

module.exports = forms;