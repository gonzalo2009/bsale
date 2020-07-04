window.onload = () => {
    
    price();
    change();
    data();
};


function price(){

    if (document.title == "Cart") {

        total = 0
        document.querySelectorAll(".cart").forEach(cart => {
            price1 = cart.querySelector(".price").innerHTML.slice(1)
            q = cart.querySelector(".cantidad1").value
            total += price1 * q

        });

        document.querySelector("#total").innerHTML = `Total: $${total}`


    }

}


function change(){
    if (document.title == "Cart") {

        document.querySelectorAll(".cantidad1").forEach(q => {
            q.onchange = () => {
                price();
            }

        });

    }
}




function data() {
    if (document.title == "Cart") {
        
        document.querySelector("#btn-comprar").onclick = () => {
            l=[]
            document.querySelectorAll(".cart").forEach(cart => {
                quantity = cart.querySelector(".cantidad1").value
                unitValue = cart.querySelector(".price").innerHTML.slice(1)
                id= cart.querySelector(".idVarianteProducto").innerHTML.slice(1)
                l.push(`{"quantity" : ${quantity}, "unitValue": ${unitValue},  "idVarianteProducto": ${id}}`)

            });
            

            url=document.querySelector("#url").dataset.url


            body = {"cartDetails": [l]}

            fetch(url, {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCookie("csrftoken")
                },
                body: body
            })

        }

    }

}



function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

