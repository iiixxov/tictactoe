let wait = 0
let field = [
   0,0,0,
   0,0,0,
   0,0,0
  ]
let first_move_button = true;

function check_win(field) {
  //возвращает значения: 1, если выиграл 'х'; -1, если выиграл 'о';
  //'continue', если нет выигрышного положение; 0, если ничья
  let taken_ceil = 0;
  //проверяет, являются ли вертикальные и горизонтальные линии выигрышными
  for (let i = 0; i < 3; i++) {
    if (field[i] == field[i+3] && field[i+3] == field[i+6] && field[i+6] != 0) return( (field[i] == 'x') ? 1 : -1);
    if (field[i*3] == field[i*3+1] && field[i*3+1] == field[i*3+2] && field[i*3+2] != 0) return( (field[i*3] == 'x') ? 1 : -1);
  }
  //проверяет, являются ли диагонали выигрышными  
  if (field[0] == field[4] && field[4] == field[8] && field[8] != 0 || field[2] == field[4] && field[4] == field[6] && field[6] != 0) 
    return( (field[4] == 'x') ? 1 : -1)
  //проверяет сколько ячеек занято, возвращает ничью если заняты все
  for (let i = 0; i < 9; i++) if (field[i] != 0) taken_ceil++
  return( (taken_ceil == 9) ? 0 : 'continue')
}

function person_move(pos) {
  //удаляет кнопку первого хода, если она есть
  if (first_move_button) {
    first_move_button = false;
    let button = $('#first_move');
    button.remove();
  }
  //делает ход, передает ход компьютеру.
  if (wait == 0) {
    wait = 1; 
    field[pos] = 'o'
    
    ceil = $(`#ceil_${pos}`);
    img = $(`<img src='image 3.png'>`);
    ceil.html('');
    ceil.append(img);
    
    if (check_win(field) == 'continue') ii_move(pos);
    else is_game_over()
  }
}


function ii_move(pos) {
  //теперь уже компьютер делает ход
  let move;
  let best_score = -999999999;
  let subField = field.slice(0);
  let score;
  //перебирает все возможные ходы, возвращает с наибольшим количеством очков
  outer: for (let i = 0; i < 9; i++) {
    if (subField[i] == 0) {
      //получает количество очков при ходе на позицию i
      subField[i] = 'x';
      console.log(subField);
      score = return_best_score(subField, -1);
      //сравнивает полученые очки с лучшими
      if (score > best_score) {
        best_score = score;
        move = i;
        //сразу ходит, если ход выигрышный
        if (check_win(subField) == 1) break outer;
      }
      subField[i] = 0
      console.log(score);
    }
  }
  console.log('--------------------------------------------------')
  //ставит 'x' на поле
  field[move] = 'x'
  
  let ceil = $(`#ceil_${move}`);
  let img = $(`<img src='image 2.png'>`);
  ceil.html('');
  ceil.append(img);
  
  wait = 0;
  //проверка на законченость игры
  is_game_over();
}

function return_best_score(field, player) {
  //возвращает количетво очков каждого положения, рекурсивно перебирая все возможные исходы игры
  let best_score = (player ==  1) ? -999999999 : 999999999;
  let score;
  let subField = field.slice(0);
  //если положение является конечным, возвращает: 1, в случае победы 'x'; -1, в случае победы 'o'; 0, в случае ничьи
  if (check_win(field) != 'continue') return(check_win(field))
  //если player 1 (x), продолжает рекурсию всех вариантов его ходов, передавая ход player -1 (o), возвращает наибольшее количество очков
  //если player -1 (o), возвращает наименьшее
  for (let i = 0; i < 9; i++) 
    if (subField[i] == 0) {
      subField[i] = (player == 1) ? 'x' : 'o';
      score = return_best_score(subField, -1 * player);
      subField[i] = 0;
      if (player == 1 && score > best_score) best_score = score;
      else if (player == -1 && score < best_score) best_score = score;
  }
  return(best_score)
}

function ii_first_move() {
  //удаляет кнопку первого хода
  let button = $('#first_move');
  button.remove();
  //ставит 'x' в любую из неповторяющихся позиций
  let moves = [0, 1, 4];
  let move = moves[Math.floor(Math.random() * 3)]
  field[move] = 'x';

  ceil = $(`#ceil_${move}`);
  img = $(`<img src='image 2.png'>`);
  ceil.html('');
  ceil.append(img);
}

function is_game_over() {
//если игра имеет конечное положение, выводит соотвествующую надпись
  if (check_win(field) != 'continue') {
    //блокирует поле
    wait = 1;
    let text;
    //выводит надпись
    if (check_win(field) == 1) text = $('<h1>Победа х</h1>');
    else if (check_win(field) == -1) text = $('<h1>Победа o</h1>');
    else text = $('<h1>Ничья</h1>');
    
    let board = $('.board');
    board.append(text);
  }
}