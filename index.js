const select = document.querySelectorAll("select");
const input = document.querySelectorAll("input");
const apiUrl = "https://api.exchangerate.host/latest/";
let html = "";

function currency() {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const arrKeys = Object.keys(data.rates);
        const rates = data.rates;
        arrKeys.forEach(item => {
            html += `<option  value=${item}>${item}</option>`;
          });          
        for (let i = 0; i < select.length; i++) {
          select[i].innerHTML = html;
        }
  
        function convert(i, j) {

           input[i].value = (input[j].value * rates[select[i].value]) / rates[select[j].value];

           value1 =  input[i].value;
           value2 =  input[j].value;

            if(value1 == 0 || value2 == 0 ){
               
                input[i].value = '';
                input[j].value = '';
               
            }
           
         
        }
  
        input[0].addEventListener("keyup", () => convert(1, 0));
        input[1].addEventListener("keyup", () => convert(0, 1));
        select[0].addEventListener("change", () => convert(1, 0));
        select[1].addEventListener("change", () => convert(0, 1));
      })
      .catch(err => console.error(err));
  }
  

currency();
