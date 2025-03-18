const caminho = 'http://localhost:3000/livros';

async function getLivros() {
    try {
        const response = await fetch(`${caminho}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if(response.ok) {
            return result;
        }
    } catch(error) {
        alert('Erro ao conectar com o servidor');
        return null;
    }
}

async function postLivro(nome, autor, genero, preco) {
    try {
        const response = await fetch(`${caminho}/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                autor: autor,
                genero: genero,
                preco: preco
            })
        });

        const result = await response.json();

        if(result.ok) {
            alert(result.message || 'Livro cadastrado com sucesso!')
        } else {
            alert(result.message || 'Erro ao cadastrar livro')
        }
    } catch(error) {
        alert('Erro ao conectar com o servidor');
        console.log(error);
    }
}

async function putLivro(id, nome, autor, genero, preco) {
    try {
        const response = await fetch(`${caminho}/${id}`, {
            method: 'PUT',
            headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                autor: autor,
                genero: genero,
                preco: preco
            })
        });

        const result = await response.json();

        if(result.ok) {
            alert(result.message || 'Dados atualizados com sucesso!')
        } else {
            alert(result.message || 'Erro ao atualizar dados do livro')
        }
    } catch(error) {
        alert('Erro ao conectar com o servidor');
        console.log(error);
    }
}

async function deleteLivro(id) {
    try {
        const response = await fetch(`${caminho}/${id}`, {
            method: 'DELETE',
            headers: {
                    'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if(result.ok) {
            alert(result.message || 'Dados atualizados com sucesso!')
        } else {
            alert(result.message || 'Erro ao atualizar dados do livro')
        }
    } catch(error) {
        alert('Erro ao conectar com o servidor');
        console.log(error);
    }
}

const inputs = document.querySelector("#inputs").children;
const cadastro = document.querySelector("#cadastro");
const altera = document.querySelector("#altera");
const deleta = document.querySelector("#deleta");
const tabela = document.querySelector("#tabela");

let livros = [];

async function encherBiblioteca() {
    livros = await getLivros();

    if (!livros) return;

    tabela.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Gênero</th>
            <th>Autor</th>
            <th>Preço</th>
        </tr>`
    livros.forEach(livro => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${livro.id}</td>
            <td>${livro.nome}</td>
            <td>${livro.autor}</td>
            <td>${livro.genero}</td>
            <td>${livro.preco}</td>
        `;
        tabela.appendChild(tr);
    });
}

cadastro.addEventListener("click", async () => {
    const nome = inputs[1].value;
    const autor = inputs[2].value;
    const genero = inputs[3].value;
    const preco = inputs[4].value;
    await postLivro(nome, autor, genero, preco);
    inputs[0].value = ''
    inputs[1].value = ''
    inputs[2].value = ''
    inputs[3].value = ''
    inputs[4].value = ''
    encherBiblioteca();
});

altera.addEventListener("click", async () => {
    const id = inputs[0].value;
    const nome = inputs[1].value;
    const autor = inputs[2].value;
    const genero = inputs[3].value;
    const preco = inputs[4].value;
    await putLivro(id, nome, autor, genero, preco);
    inputs[0].value = ''
    inputs[1].value = ''
    inputs[2].value = ''
    inputs[3].value = ''
    inputs[4].value = ''
    encherBiblioteca();
});

deleta.addEventListener("click", async () => {
    const id = inputs[0].value;
    await deleteLivro(id);
    inputs[0].value = ''
    inputs[1].value = ''
    inputs[2].value = ''
    inputs[3].value = ''
    inputs[4].value = ''
    encherBiblioteca();
});

livros.forEach(livro => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td> ${livro.id} </td>
    <td> ${livro.nome} </td>
    <td> ${livro.autor} </td>
    <td> ${livro.genero} </td>
    <td> ${livro.preco} </td>`
    tabela.appendChild(tr);
});

encherBiblioteca();
