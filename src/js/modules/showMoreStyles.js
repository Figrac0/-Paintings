 
import { getResource } from "../services/requests";

const showMoreStyles = (trigger, wrapper) =>{

    const btn = document.querySelector(trigger);
          

    btn.addEventListener('click', function() {
        getResource('assets/db.json')
        .then(res => createCards(res.styles))
        .catch(error => {
            console.log(error);
            showError(wrapper, "Не удалось загрузить данные");
        });

        this.remove();
    });

    function createCards(response){
        response.forEach(({src, title, link }) =>{
            let card =document.createElement('div');
            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');

            card.innerHTML = `
                <div class="styles-block">
                    <img src=${src} alt="style">
                    <h4>${title}</h4>
                    <a href=${link}>Подробнее</a>
                </div>
            `;

            document.querySelector(wrapper).appendChild(card); 
        });
    }
    function showError(wrapper, message) {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message'); 
        errorDiv.textContent = message;

        document.querySelector(wrapper).appendChild(errorDiv); 
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

};

export default showMoreStyles;