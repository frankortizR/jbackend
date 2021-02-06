window.addEventListener('load', async () => {
    const token = localStorage.getItem('tokensito');
    if(token){
        alert('----YA inicio sesion---');
        window.location.href = '/';
    }
});




let botoncito = document.getElementById('si_form');
//campos de texto
let username = document.getElementById('inu')
let contra = document.getElementById('inc')

botoncito.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('wenas wenas como estamos');
    console.log(username.value);
    console.log(contra.value);

    await axios({
        method: 'POST',
        url: '/signin',
        data: {
            username: username.value,
            password: contra.value,
        }
    }).then(res => {
        console.log(res.data);
        console.log(res.data.token);
        console.log(res.data.valid);
        localStorage.setItem('tokensito', res.data.token);
        if (res.data.valid == false) {
            alert('datos no validos parce');
            localStorage.clear();
            username.value = "";
            contra.value = "";
        } else {
            localStorage.setItem('tokensito', res.data.token);
            window.location.href = '/newprod';
        }
    }).
    catch(err => console.log(err));
});