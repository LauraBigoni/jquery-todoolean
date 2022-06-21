$(document).ready(function () {
  console.log("jquery ready");

  // Eseguo la funzione [1] createNewTodo();
  createNewTodo();
  // [3]
  saveNewTodo();
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

      // Controllo la lunghezza del testo
      if (textTodo.length > 0) {

        // Se è maggiore di 0
        input.parent('.todo__text').html(textTodo);
        console.log(textTodo);
      } else {

        // Altrimenti...
        input.parents('.todos__item').remove();
      }
    })
    .keyup(function (event) {
      // Il this si riferisce all'evento keyup
      const input = $(this);
      console.log(this);
      // Controllo la lunghezza e il codice del tasto premuto
      // Se è 27 = ESC ed è > 0
      if (event.keyCode === 27 && textTodo.length > 0) {
        input.parent('.todo__text').html(textTodo);
        // Se non ha contenuto allora...
      } else if (event.keyCode === 27 && textTodo.length === 0) {
        input.parents('.todos__item').remove();
      }
    });
}

// [3]
function saveNewTodo() {
  $(document).on('keypress', '.todo__text__input', function (event) {

    if (event.keyCode === 13) {
      const input = $(this);

      if (input.val().trim().length > 0) {
        input.parent('.todo__text').html(input.val());
      } else {
        input.parents('.todos__item').remove();
      }
    }
  });
}