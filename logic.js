var button = document.querySelector('button');

function clickMe() {
    document.querySelector(".magic").style.display = "none";
    var num = (document.querySelector('.number').value);
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${num}`)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not OK");
        })
        .then(function (response) {
            const pokemon = {};

            // Initialize the count of each Pokémon to 0 with index starting from 1
            response.results.forEach(function (pokemonData, index) {
                const pokemonIndex = index + 1;
                const min = 5;
                const max = 10;
                const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
                pokemon[pokemonIndex] = {
                    name: pokemonData.name,
                    count: 0,
                    price: pokemonIndex*randomNum
                };
            });



            function display_item() {

                for (const i in pokemon) {
                    document.querySelector(".item_container .container").innerHTML += `<div class="itembox" id="itembox${i}">
                <span class="code" id="code${i}">${pokemon[i]['name']}</span>
                <br>
                <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png' class="img">
                <br>
                <span>₹${pokemon[i]['price']}</span>
                <span class="quantity" id="quantity${i}">
                    <span class="plus" id="plus${i}">+</span>
                    <span class="quan" id="quan${i}">0</span>
                    <span class="minus" id="minus${i}">-</span>
                </span>
            </div>`;
                }
            }
            display_item();

            function updateQuantity() {
                for (const i in pokemon) {
                    let count = pokemon[i]['count'];
                    let add = document.querySelector(`#plus${i}`);
                    let sub = document.querySelector(`#minus${i}`);
                    let quant = document.querySelector(`#quan${i}`);

                    add.addEventListener('click', function () {
                        count++;
                        quant.innerText = count;
                        pokemon[i]['count'] = count;
                        dis_pokemon(pokemon);
                        // plus();
                    })

                    sub.addEventListener('click', function () {
                        if (count > 0) {
                            count--;
                            quant.innerText = count;
                            pokemon[i]['count'] = count;
                            dis_pokemon(pokemon);
                            // minus();
                        }
                    })
                }
            }

            updateQuantity();

        })// universal


    // function dis_pokemon(p){
    //     document.querySelector(".result_1").innerHTML += `
    //     <div class="dis_1">${p['name']},${p['count']}</div>
    //     <div>${p}</div>`

    // }
    // function dis_pokemon(p){
    //     const total = sumTotalCount(p);
    //     document.querySelector(".result_1").innerHTML += `
    //     <div class="dis_1">${JSON.stringify(p)}</div>
    //     <div>${total}</div>`

    // }
    function dis_pokemon(p) {
        const count = sumTotalCount(p);
        const price = TotalPrice(p);
        
        document.querySelector(".result_1").innerText = `Total number of pokemons: ${count}
                                                         Total price of your order:     ₹${price}
                                                         `
    }


    // function plus(){
    //     const total = sumTotalCount(p);
    //     document.querySelector(".result_1").innerText = `Total number of pokemons when added:  ${total}`
    // }
    // function minus(){
    //     const total = sumTotalCount(p);
    //     document.querySelector(".result_1").innerText = `Total number of pokemons when substacted:  ${total}`
    // }


    document.querySelector("h1").innerHTML += `<div class="tit">Your wishlist:</div>`

    
    function sumTotalCount(obj) {
        let totalCount = 0;
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                totalCount += obj[key].count;
            }
        }
        return totalCount;
    }

    function TotalPrice(obj) {
        let totalPrice = 0;
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                totalPrice += obj[key].price * obj[key].count;
            }
        }
        return totalPrice;
    }

    // function bill(obj) {
    //     items = ""
    //     for (let key in obj) {
    //         if (obj.hasOwnProperty(key)) {
    //             if(obj[key].count != 0 ){
    //                 items += `${obj[key].name}`
    //             }
    //         }
    //     }
    // }    





    document.querySelector(".container_2").style.backgroundColor = "rgba(186, 184, 211, 0.159)";
    document.querySelector(".container_2").style.boxShadow =  "0 0 10px 1px rgb(0, 0, 0)";

    document.querySelector(".result_3").innerHTML = `
    <button type="button" class="but_2">ORDER</button>`

    var but_2 = document.querySelector('.but_2');

    function order() {
        // document.querySelector(".navbar .container").style.display = "none";
        document.querySelector(".container_1").style.display = "none";
        document.querySelector(".container_2").style.display = "none";
        document.querySelector(".thank").innerHTML = `<img src="thankyou.png" class="ty_img"></img>
                                                      `
        

    }
    but_2.addEventListener('click', order)





}
button.addEventListener('click', clickMe);