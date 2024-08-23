const accordion = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector);

    btns.forEach(btn =>{
        btn.addEventListener('click', function(){

            btns.forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.classList.remove('active-style');
                    otherBtn.nextElementSibling.classList.remove('active-content');
                    otherBtn.nextElementSibling.style.maxHeight = '0px';
                }
            });

            this.classList.toggle('active-style');
            this.nextElementSibling.classList.toggle('active-content');

            if(this.classList.contains('active-style')){
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight+80+'px';
            }else {
                this.nextElementSibling.style.maxHeight = '0px';
            }

            
            
        });
    });


    //       blocks = document.querySelectorAll(itemsSelector);

    // blocks.forEach(block =>{
    //     block.classList.add('animated', 'fadeInDown');

    // });

    // btns.forEach(btn =>{
    //     btn.addEventListener('click', function(){
    //         if(!this.classList.contains('active')){
    //             btns.forEach(btn =>{
    //                 btn.classList.remove('active', 'active-style');
    //             });
    //             this.classList.add('active', 'active-style');
    //         }
    //     });
    // });

};

export default accordion;