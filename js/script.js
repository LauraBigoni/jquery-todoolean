$(document).ready(function () {
  console.log("jquery ready");
  // Eseguo la funzione createNewTodo();
  createNewTodo();
});

function createNewTodo() {
  $('.add-todo .btn').click(function (event) {
    // Non faccio ricaricare la pagina
    event.preventDefault();

    // Clono il  LI dal template
    const todo = $('.template--todo').children().clone();
    console.log(todo);

    // Lo appendo in cima alla UL
    $('.todos').prepend(todo);
  });
}