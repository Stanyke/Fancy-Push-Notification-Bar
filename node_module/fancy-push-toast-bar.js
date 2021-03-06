var exports = module.exports = {}

exports.Toast = (user_text, user_color, notice_duration) => {

    editFancyBox = (user_text, user_color, idValue) => {
        if(user_color)
        {
            if(user_color === "blue")
            {
                user_color = "#057da5";
            }
            else if(user_color === "red")
            {
                user_color = "#FF0033";
            }
            else if(user_color === "orange")
            {
                user_color = "orange";
            }
            else if(user_color === "dark")
            {
                user_color = "#333333";
            }
            else if(user_color === "pink")
            {
                user_color = "#CC0099";
            }
            else
            {
                user_color = "#333333";
            }
        }
        
        
        document.getElementById("notice_text_fancy_"+idValue).innerText = user_text;
        document.getElementById("notice_outer_"+idValue).style.background = user_color;
        document.getElementById("notice_outer_"+idValue).style.color = "white";
    }



    const animateLeft = async (obj, from, to) => {
        if(to >= from)
        {
        return
        }
        else
        {
            var box = obj;
            box.style.marginLeft = from + "px";
            setTimeout(function(){
            animateLeft(obj, from - 10, to);
            }, 10)
        }
    }


    animateRight = (obj, from, to) => {
        
        if(from >= to){
        //obj.style.visibility = 'hidden';
        return;
        }
        else
        {
            var box = obj;
            box.style.marginLeft = from + "px";
            setTimeout(function(){
            animateRight(obj, from + 10, to);
            }, 10) 
        }
    }


    const notice_close = async (e) => {
        var parentId = e.parentNode.id;
        
        animateLeft(document.getElementById(parentId), 0, -500)
        setTimeout(()=> {
            let p = e.parentNode;
            if(p.className)
            {
                setTimeout( () =>
                {
                    p.parentNode.removeChild(p);
                }, 500);
            }
        }, 1000)
    }


    runCountDown = (totalFancyFieldsAvailable, notice_duration) => {
        let number = notice_duration;
        let p = document.getElementById('notice_time_countdown_'+totalFancyFieldsAvailable).parentNode.parentNode;

        let remainingSeconds = document.getElementById('notice_time_countdown_'+totalFancyFieldsAvailable).innerHTML.slice(0, -1);

        number = remainingSeconds;

        let interval;

        p.onmouseover = () => {
            clearInterval(interval)
        }

        p.onmouseleave = () => {
            interval = setInterval(() =>  {
                document.getElementById('notice_time_countdown_'+totalFancyFieldsAvailable).innerHTML =  `${number--}s`;

                if(number < 0) {
                    clearInterval(interval);
                    animateLeft(document.getElementById("notice_outer_"+totalFancyFieldsAvailable), 0, -500)
                        
                    setTimeout(() => {
                        p.remove();
                    }, 1500)
                }
            }, 1000);
        }

        interval = setInterval(() =>  {
            document.getElementById('notice_time_countdown_'+totalFancyFieldsAvailable).innerHTML =  `${number--}s`;

            if(number < 0) {
                clearInterval(interval);
                animateLeft(document.getElementById("notice_outer_"+totalFancyFieldsAvailable), 0, -500)
                    
                setTimeout(() => {
                    p.remove();
                }, 1500)
            }
        }, 1000);
    }


    sendForm = () => {
        
        let allFancyFields = document.getElementsByClassName('notice_outer');
            
        if(allFancyFields.length > 0)
        {
            let lastFancyFields = allFancyFields[allFancyFields.length - 1];
            var totalFancyFieldsAvailable = lastFancyFields.id.charAt(lastFancyFields.id.length-1);
                
            totalFancyFieldsAvailable++;
        }
        else
        {
            var totalFancyFieldsAvailable = 1;
        }
            
            
        let fancyNoticeOuter = document.createElement('div');
        fancyNoticeOuter.setAttribute('class', 'notice_outer')
        fancyNoticeOuter.setAttribute('id', 'notice_outer_'+totalFancyFieldsAvailable)
        fancyNoticeOuter.style.width = "400px"
        fancyNoticeOuter.style.marginLeft = "-500px"
        fancyNoticeOuter.style.height = "70px"
        fancyNoticeOuter.style.display = "flex"
        fancyNoticeOuter.style.overflow = "auto"
        fancyNoticeOuter.style.borderRadius = "0px 10px 10px 0px"
        fancyNoticeOuter.style.marginBottom = "5px"
        fancyNoticeOuter.style.transition = "1s"
    
    
        let fancyNoticeText = document.createElement('div');
        fancyNoticeText.setAttribute('class', 'notice_text');
        fancyNoticeText.setAttribute('id', 'notice_text');
        fancyNoticeText.style.flex = "93%"
        fancyNoticeText.style.padding = "0px 20px 0px 10px"
    
        let fancyNoticeTextParagraph = document.createElement('p');
        fancyNoticeTextParagraph.setAttribute('id', 'notice_text_fancy_'+totalFancyFieldsAvailable)
    
        let fancyNoticeBoxClose = document.createElement('div');
        fancyNoticeBoxClose.setAttribute('class', 'notice_close');
        fancyNoticeBoxClose.setAttribute('id', 'notice_close');
        fancyNoticeBoxClose.setAttribute('onclick', 'notice_close(this)')
        fancyNoticeBoxClose.style.flex = "7%"
        fancyNoticeBoxClose.style.cursor = "pointer"
        fancyNoticeBoxClose.style.height = "0px"
            
        let fancyNoticeBoxCloseParagraph = document.createElement('p')
        fancyNoticeBoxCloseParagraph.innerHTML = "&#10005"
    
        let fancyNoticeBoxCloseParagraphTimeCountDown = document.createElement('p')
        fancyNoticeBoxCloseParagraphTimeCountDown.setAttribute('class', 'notice_time_countdown_'+totalFancyFieldsAvailable)
        fancyNoticeBoxCloseParagraphTimeCountDown.setAttribute('id', 'notice_time_countdown_'+totalFancyFieldsAvailable)
        fancyNoticeBoxCloseParagraphTimeCountDown.innerHTML = `${notice_duration}s`
        fancyNoticeBoxCloseParagraphTimeCountDown.style.fontSize = "11px"
        fancyNoticeBoxCloseParagraphTimeCountDown.style.position = "relative"
        fancyNoticeBoxCloseParagraphTimeCountDown.style.bottom = "10px"
        fancyNoticeBoxCloseParagraphTimeCountDown.style.padding = "3px"
    
    
        let getBodyElement = document.getElementsByTagName('body')[0];
    
        getBodyElement.appendChild(fancyNoticeOuter);
        fancyNoticeOuter.appendChild(fancyNoticeText);
        fancyNoticeText.appendChild(fancyNoticeTextParagraph);
        fancyNoticeOuter.appendChild(fancyNoticeBoxClose);
        fancyNoticeBoxClose.appendChild(fancyNoticeBoxCloseParagraph);
        fancyNoticeBoxClose.appendChild(fancyNoticeBoxCloseParagraphTimeCountDown);
        
        
        
        
        
        function myFunction(x) {
          if (x.matches) {
            document.getElementById('notice_outer_'+totalFancyFieldsAvailable).style.width = "100%"
            
            document.body.style.backgroundColor = "yellow";
          } else {
           document.getElementById('notice_outer_'+totalFancyFieldsAvailable).style.width = "400px"
           document.body.style.backgroundColor = "pink";
          }
        }
    
        var x = window.matchMedia("(max-width: 400px)")
        myFunction(x)
        x.addListener(myFunction)
        
        editFancyBox(user_text, user_color, totalFancyFieldsAvailable)
        animateRight(document.getElementById("notice_outer_"+totalFancyFieldsAvailable), -400, 0)
    
        runCountDown(totalFancyFieldsAvailable, notice_duration)
    }
    

}