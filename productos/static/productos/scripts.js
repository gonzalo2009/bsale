window.onload = () => {
    price();
    change();
    data();
    add();
};


function price(){

    if (document.title == "Cart" && document.querySelector("#total")) {

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
    if (document.title == "Cart" && document.querySelector("#total")) {

        document.querySelectorAll(".cantidad1").forEach(q => {
            q.onchange = () => {
                price();
            }

        });

    }
}


function data() {
    if (document.title == "Cart" && document.querySelector("#total")) {
        
        document.querySelector("#btn-comprar").onclick = () => {
            l=[]
            document.querySelectorAll(".cart").forEach(cart => {
                quantity = cart.querySelector(".cantidad1").value
                unitValue = cart.querySelector(".price").innerHTML.slice(1)
                id= cart.querySelector(".idVarianteProducto").innerHTML.slice(1)
                l.push(`{"quantity":${quantity},"unitValue":${unitValue},"idVarianteProducto":${id}}`)

            });
            document.querySelector("#data").value = `{"cartDetails":[${l}]}`;
            document.querySelector("#form-data").submit();
        }
    }
}



function add() {
    
    if (document.title == "Home") {
        document.querySelectorAll(".btn-add").forEach(button => {
        button.onclick = () => {
            
            url = button.dataset.url;
            id = button.dataset.product;
            fetch(url + "?id=" + id);
            }
        });
    }
}

