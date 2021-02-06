const out = document.getElementById('icono_out');
out.addEventListener('click', () => {
    const token = localStorage.getItem('tokensito');
    if(!token){
        alert('----NO ha inciado seison');
    } else{
        if(confirm('Desea salir?')) {
            localStorage.clear();
            window.location.href = '/';
        } else{

        }
    }
});