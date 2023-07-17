function modal() {
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
        if (e.target === modal || e.target.getAttribute('data-close') == '') {       //e.target-ით მივიღებ მონაცემებს, თუ სად ვაკლიკებ და თუ იგი დაემთხვა modal-ს, მაშინ მას ვხურავ
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

}

module.exports = modal;