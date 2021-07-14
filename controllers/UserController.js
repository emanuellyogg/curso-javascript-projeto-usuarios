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

      this.getPhoto((content) => {
        values.photo = content;
        this.addLine(values);
      });
    });
  }

  getPhoto(callback) {
    let fileReader = new FileReader();

    let elements = [...this.formEl.elements].filter(item => {
      if (item.name === 'photo') {
        return item;
      }
    });

    let file = elements[0].files[0];

    fileReader.onload = () => {
      callback(fileReader.result);
    };

    fileReader.readAsDataURL(file);
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
  addLine(dataUser) {

    this.tableEl.innerHTML = `
    <tr>
      <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
      <td>${dataUser.name}</td>
      <td>${dataUser.email}</td>
      <td>${dataUser.admin}</td>
      <td>${dataUser.birth}</td>
      <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
      </td>
    </tr>
  `;
  }

}