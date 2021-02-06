
let botoncito = document.getElementById('tore_form');
//campos de texto
let username = document.getElementById('inu')
let contra = document.getElementById('inc')
let contraver = document.getElementById('incc')

botoncito.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('wenas wenas como estamos');
    console.log(username.value);
    console.log(contra.value);
    console.log(contraver.value);

    if(contra.value != contraver.value){
        alert('----Las contras no coinciden-----');
        return 0;
    }
    

    await axios({
        method: 'POST',
        url: '/signup',
        data: {
            username: username.value,
            password: contraver.value,
        }
    }).then(async res => {
        console.log(res.data);
        console.log(res.data.token);
        console.log(res.data.message);
        console.log(res.data.valid);
        if(res.data.valid == false){
            alert('usuario ya registrado parce');
            localStorage.clear();
            username.value = "";
            contra.value = "";
            contraver.value = "";
        } else {
            localStorage.setItem('tokensito', res.data.token);
            window.location.href = '/newprod';
        }
    }).
        catch(err => console.log(err));
    
});