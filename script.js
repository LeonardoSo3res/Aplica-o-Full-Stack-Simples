const form=document.getElementById('formUsuario'),
      lista=document.getElementById('listaUsuarios');

async function carregar(){
  const res=await fetch('/api/usuarios'), usuarios=await res.json();
  lista.innerHTML=usuarios.map(u=>`
    <tr>
      <td>${u.id}</td>
      <td>${u.nome}</td>
      <td>${u.email}</td>
      <td>
        <button onclick="editar(${u.id})">Editar</button>
        <button onclick="excluir(${u.id})">Excluir</button>
      </td>
    </tr>`).join('');
}

async function salvar(e){
  e.preventDefault();
  const id=document.getElementById('id').value,
        nome=document.getElementById('nome').value,
        email=document.getElementById('email').value;
  await fetch(id?`/api/usuarios/${id}`:'/api/usuarios',{
    method: id?'PUT':'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({nome,email})
  });
  form.reset(); carregar();
}

async function editar(id){
  const res=await fetch(`/api/usuarios/${id}`), u=await res.json();
  document.getElementById('id').value=u.id;
  document.getElementById('nome').value=u.nome;
  document.getElementById('email').value=u.email;
}

async function excluir(id){
  if(confirm('Deseja excluir?')){
    await fetch(`/api/usuarios/${id}`,{method:'DELETE'});
    carregar();
  }
}

form.addEventListener('submit', salvar);
carregar();