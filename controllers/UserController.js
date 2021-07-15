class UserController {
  constructor(formId, tableId) {
    this.formEl = document.getElementById(formId);
    this.tableEl = document.getElementById(tableId);

    this.onSubmit();
  }

  onSubmit() {
    //Evento de envio de formulário após preencher os dados.
    this.formEl.addEventListener('submit', event => {
      event.preventDefault();
      let values = this.getValues();

      this.getPhoto().then((content) => {
        values.photo = content;
        this.addLine(values);

      }, (e) => {
        console.error(e);
      });
    });
  }

  getPhoto() {
    return new Promise((resolve, reject) => {

      let fileReader = new FileReader();

      let elements = [...this.formEl.elements].filter(item => {
        if (item.name === 'photo') {
          return item;
        }
      });

      let file = elements[0].files[0];

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (e) => {
        reject(e);
      }

      if (file) {
        fileReader.readAsDataURL(file);
      } else {
        resolve('dist/img/boxed-bg.jpg');
      }
    });
  }

  //retorna nosso usuário
  getValues() {

    let user = {};

    // o uso Spread, expressão esperando múltiplos parâmetros
    [...this.formEl.elements].forEach(function (field, index) {
      if (field.name == "gender") {
        if (field.checked) {
          user[field.name] = field.value;
        }
      } else if (field.name == admin) {
        user[field.name] = field.checked;
      } else {
        user[field.name] = field.value;
      }
    });

    // este objeto representa a classe User, para ter acesso aos seus atributos e métodos.
    return new User(
      user.name,
      user.gender,
      user.birth,
      user.country,
      user.email,
      user.password,
      user.photo,
      user.admin
    );
  }

  // Adicionar nova linha, ou seja, criação de cadastro após o usuário preencher os dados
  // Aqui onde fica a View
  addLine(dataUser) {

    let tr = document.createElement('tr');

    tr.innerHTML = `
   
      <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
      <td>${dataUser.name}</td>
      <td>${dataUser.email}</td>
      <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
      <td>${dataUser.birth}</td>
      <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
      </td>
    `;

    this.tableEl.appendChild(tr);
  }

}