$(document).ready(function () {
  console.log("jquery ready");
  // Eseguo la funzione createNewTodo();
  createNewTodo();
});

// * --- CRUD ---
// [1]
function createNewTodo() {
  $('.add-todo .btn').click(function (event) {
    // Non faccio ricaricare la pagina
    event.preventDefault();

    // Clono il  LI dal template
    const todo = $('.template--todo').children().clone();
    console.log(todo);

    // Lo appendo in cima alla UL
    $('.todos').prepend(todo);

    // Passo todo alla funzione createInput();
    // E prendo la classe .text del figlio
    createInput(todo.children('.text'));
  });
}

// [2]
function createInput(todo) {
  // Salvo il testo dell'input in una variabile
  let textTodo = $(todo).children('.todo__text').text().trim();
  console.log(textTodo);
  // Clono il template
  const input = $('.template--text').children().clone();

  // Inserisco il testo dell'input nell'HTML
  todo.children('.todo__text').html(input);

  // A seconda degli eventi faccio cose...
  input
    .val(textTodo)
    .focus()
    .focusout(function () {
      // Salvo il val dell'input in una variabile e uso il THIS
      const input = $(this);

      if (textTodo.length > 0) {
        input.parent('.todo__text').html(textTodo);
        console.log(textTodo);
      } else {
        input.parents('.todos__item').remove();
      }
    })
    .keyup(function (event) {
      const input = $(this);

      if (event.keyCode === 27 && textTodo.length > 0) {
        input.parent('.todo__text').html(textTodo);
      } else if (event.keyCode === 27 && textTodo.length === 0) {
        input.parents('.todos__item').remove();
      }
    });
}