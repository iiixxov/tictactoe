let wait = 0
let field = [
   0,0,0,
   0,0,0,
   0,0,0
  ]

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
  //делает ход, передает ход компьютеру.
  if (wait == 0) {
    wait = 1; 
    field[pos] = 'o'
    
    ceil = $(`#ceil_${pos}`);
    img = $(`<img src='image 3.png'>`);
    ceil.html('');
    ceil.append(img);
    
    ii_move(pos);
  }
}


function ii_move(pos) {
  //теперь уже компьютер делает ход
  let move;
  let best_score = -999999999;
  let subField = field.slice(0);
  let score;
  //перебирает все возможные ходы, возвращает с наибольшим количеством очков
  for (let i = 0; i < 9; i++) {
    if (subField[i] == 0) {
      //получает количество очков при ходе на позицию i
      subField[i] = 'x';
      console.log(subField);
      score = minimax(subField, -1);
      subField[i] = 0;
      //сравнивает полученые очки с лучшими
      if (score > best_score) {
        best_score = score;
        move = i
      }
      console.log(score);
    }
  }
  console.log('--------------------------------------------------')
  field[move] = 'x'
  
  ceil = $(`#ceil_${move}`);
  img = $(`<img src='image 2.png'>`);
  ceil.html('');
  ceil.append(img);
  
  wait = 0;
}

function minimax(field, player) {
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
      score = minimax(subField, -1 * player);
      subField[i] = 0;
      if (player == 1 && score > best_score) best_score = score;
      else if (player == -1 && score < best_score) best_score = score;
  }
  return(best_score)
}

function ii_first_move() {
  //удаляет кнопку первого хода
  button = $('#first_move');
  button.remove();
  //ставит 'x' в любой из углов
  let corners = [0, 2, 6, 8];
  let corner = corners[Math.floor(Math.random() * corners.length)]
  field[corner] = 'x';

  ceil = $(`#ceil_${corner}`);
  img = $(`<img src='image 2.png'>`);
  ceil.html('');
  ceil.append(img);
}