window.addEventListener('load', async () => {
    const tokensito = localStorage.getItem('tokensito');
    if (!tokensito) {
        alert('No se ha identificado');
        window.location.href = '/tosignup';
    } else {
        await axios({
            method: 'POST',
            url: '/verytok',
            data: {
                token: tokensito,
            }
        }).then(res => {
            console.log(res.data);
            console.log(res.data.auth);
            if (res.data.auth == false) {
                alert('no hay autentificacion');
                window.location.href = '/tosignup';
            } else{
                //alert('verificacion VALIDA');
            }
        }).
        catch(err => console.log(err));
    }
});

let botoncito = document.getElementById('home_form');
//campos de texto
let title = document.getElementById('int')
let price = document.getElementById('inp')
let imgp = document.getElementById('inm')
let description = document.getElementById('ind')
botoncito.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Buenas');
    console.log(title.value);
    console.log(price.value);
    console.log(imgp.value);
    console.log(description.value);


    axios({
        method: 'POST',
        url: '/save-project',
        data: {
            title: title.value,
            price: price.value,
            imgp: imgp.value,
            description: description.value
        }
    }).then(res => console.log(res.data)).
        catch(err => console.log(err));

    title.value = "";
    price.value = "";
    imgp.value = "";
    description.value = "";
});