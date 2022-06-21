$(document).ready(function () {
  console.log("jquery ready");

  // Gestisco i dropdown menu
  dropdownMenu();

  // CRUD 
  // [1] + [2]
  createTodo();
  // [3]
  saveTodo();
  // [4]
  deleteTodo();
  // [5]
  doneTodo();
  // [6]
  updateTodo();
  // [7] 
  searchTodo();
});

// * --- CRUD ---
// [1]
function createTodo() {
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
      // console.log(this);

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
function saveTodo() {
  $(document).on('keypress', '.todo__text__input', function (event) {
    // Code 13 = ENTER
    if (event.keyCode === 13) {
      const input = $(this);

      // Setto il val degli input
      if (input.val().trim().length > 0) {
        input.parent('.todo__text').html(input.val());
      } else {
        input.parents('.todos__item').remove();
      }
    }
  });
}

// [4]
function deleteTodo() {
  $(document).on('click', '.button-todo--delete', function () {
    // This si riferisce albutton-todo--delete
    $(this).parents('.todos__item').remove();
  });
}

// [5]
function doneTodo() {
  $(document).on('click', '.button--done', function () {
    // Creo delle variabili di appoggio
    const parent = $(this).parents('.todos__item');
    const todoCOntainer = $(this).parents('.todos');

    // Verifico la condizione per mettere o togliere '.todo--done'
    if (parent.hasClass('todo--done')) {
      parent.removeClass('todo--done');
      todoCOntainer.prepend(parent);
    } else {
      parent.addClass('todo--done');
      todoCOntainer.append(parent);
    }
  });
}

// [6]
function updateTodo() {
  // Uso il doppio click per modificare il testo
  $(document).on('dblclick', '.todos__item .text', function () {
    const todoText = $(this);
    // Se non è stato checkato come done
    if (!todoText.parents('.todos__item').hasClass('todo--done')) {
      createInput(todoText);
    }
  });

  // Interagisco col tasto modifica
  $(document).on('click', '.button-todo--modify', function () {
    // Uso il traversing per risalire al parent e poi rientro al children
    const todoText = $(this).parents('.todos__item').children('.text');
    createInput(todoText);

    // Tolgo l'active dal dropdown menu
    $(this).parents('.todo__item__menu').removeClass('active');
    $(this).parents('.todo__item__menu__dropdown').removeClass('active');

  });
}

// [7]
function searchTodo() {
  // Prendo la searchBar
  const searchBar = $('.header__search');

  // Ascolto gli eventi sulla searchbar...
  searchBar.on({
    'click': function () {
      // Aggiungo la classe active alla searchBar e la metto in focus
      $(this).addClass('active').children('.search').focus();
    },
    'focusout': function () {
      // Rimuovo la classe active al focusout
      $(this).removeClass('active');
    }
  })
}

// Dropdown function
function dropdownMenu() {
  $(document).on('click', '.other-items', function () {
    // Risalgo al parent col traversing per gestire la classe active
    $(this).parent('.todo__item__menu').toggleClass('active');
    // Uso next perchè l'elemento si trova dopo la classe '.other-items'
    $(this).next('.todo__item__menu__dropdown').toggleClass('active');

    // Se siamo nell'area del dropdownMenu 
    $(document).on('mouseup', function (event) {
      const isOnDropDown =
        $(event - target).parents('.todo__item__menu').hasClass('active')
        ||
        $(event - target).parents('.todo__item__menu__dropdown').hasClass('active');

      // A questo punto controllo, e se non è in mouseup nel dropdown
      if (!isOnDropDown) {
        $('.todo__item__menu').removeClass('active');
        $('.todo__item__menu__dropdown').removeClass('active')
      }
    });
  });
}