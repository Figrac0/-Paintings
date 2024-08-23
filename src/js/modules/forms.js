import { postData } from "../services/requests";

const forms = () =>{
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input'),
          phoneInputs = document.querySelectorAll('input[name="user_phone"]'),
          nameInputs = document.querySelectorAll('input[name="user_name"]'),
          upload = document.querySelectorAll('[name="upload"]');
          
    phoneInputs.forEach(item =>{
        item.addEventListener('input', () =>{
            item.value = item.value.replace(/[^\d+-]/g, '');
        });
    });

    nameInputs.forEach(function(item) {
        item.addEventListener('input', function() {
            item.value = item.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
        });
    });;

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        fail: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    }
 
    const clearInputs = () => {
        input.forEach(item => {
            item.value = '';
        });
        upload.forEach(item =>{
            item.previousElementSibling.textContent = "Файл не выбран";
        });
    };

    upload.forEach(item =>{
        item.addEventListener('input',() =>{
            let dots;
            item.files[0].name.split('.')[0].length>6 ? dots='...' : dots=".";
            const name = item.files[0].name.split('.')[0].substring(0,6) + dots + item.files[0].name.split('.')[1];
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item =>{
        item.addEventListener('submit', (e) =>{
            e.preventDefault();
            
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display ='none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMesssgae = document.createElement('div');
            textMesssgae.textContent = message.loading;
            statusMessage.appendChild(textMesssgae);



            const formData = new FormData(item);
            let api;
            item.closest('.popup-design')||item.classList.contains('calc_form') ? api = path.designer :  api = path.question;
            console.log(api);

            postData(api, formData)
                .then(res =>{
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMesssgae.textContent = message.success;
                })
                .catch(()=> {
                    statusImg.setAttribute('src', message.fail);
                    textMesssgae.textContent = message.fail;
                })
                .finally(() =>{
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000);
                });
        });
    });
};

export default forms;