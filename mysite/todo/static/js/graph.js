window.addEventListener('DOMContentLoaded',
  function() {
    if (HTMLCanvasElement) {
      var cv = document.querySelector('#cv');
      var context = cv.getContext('2d');

      // 軸の描画
      drawLine(context);

      // 図形の描画
      makeTodo();

      // 軸名の設定
      document.getElementById("px-axis").onclick = function() {
        axis['px'] = document.getElementById("axis").value;
        reset(context);
      };
      document.getElementById("mx-axis").onclick = function() {
        axis['mx'] = document.getElementById("axis").value;
        reset(context);
      };
      document.getElementById("py-axis").onclick = function() {
        axis['py'] = document.getElementById("axis").value;
        reset(context);
      };
      document.getElementById("my-axis").onclick = function() {
        axis['my'] = document.getElementById("axis").value;
        reset(context);
      };

      // マウスでクリックされた時の動作
      cv.addEventListener('mousedown', onDown, false);
      cv.addEventListener('mousemove', onMove, false);
      cv.addEventListener('mouseup', onUp, false);
    }
  }
);

// 変数
var todo_list = [];
var axis = {'px':'+X','mx':'-X','py':'+Y','my':'-Y'};

// TODOリストのコンストラクタ設定
var Todo = function(cv, text){
  this.cv = cv
  this.text = text;
  this.x = cv.width/2;  // 初期位置は真ん中で固定
  this.y = cv.height/2;
  this.dragging = false;
}

// TODOリストのprototype設定
Todo.prototype = {
    //TODOの描画
    draw: function() {
        ctx = this.cv.getContext('2d');
        text = this.text;
        ctx.font = "30px serif";
        metrics = ctx.measureText(text);
        ctx.strokeRect(this.x, this.y+5, metrics.width, -30);
        ctx.fillText(text, this.x, this.y);
    },
    // 当たり判定
    isTouched: function(cx, cy){
      metrics = this.cv.getContext('2d').measureText(this.text);
      // キャンバスの左上端の座標を取得
      var offsetX = this.cv.getBoundingClientRect().left;
      var offsetY = this.cv.getBoundingClientRect().top;
      x = cx - offsetX;
      y = cy - offsetY;
      // 範囲は微調整した。あとで修正したい
      return (this.x < x && (this.x + metrics.width) > x && (this.y-24) < y && this.y > y);
    }
}

function makeTodo(){
  text = document.getElementsByClassName("message");
  var cv = document.querySelector('#cv');
  var context = cv.getContext('2d');
  for (var i = 0;i < text.length;i++) {
    todo = new Todo(cv,text[i].innerText);
    todo_list.push(todo);
  }
  for (var i = 0;i < todo_list.length;i++) {
    todo_list[i].draw();
  }
}

// 軸の描画
function drawLine(c){
  // パスの開始
  c.beginPath();
  // 始点／終点を設定（1本目）
  c.moveTo(100, 320);
  c.lineTo(900, 320);
  // 始点／終点を設定（2本目）
  c.moveTo(500, 20);
  c.lineTo(500, 620);
  // パスに沿って直線を描画（3）
  c.stroke();
  // 軸の記述
  c.font = "20px serif";
  c.fillText(axis['py'], 500, 30, 200);
  c.fillText(axis['my'], 500, 600, 200);
  c.fillText(axis['px'], 800, 300, 200);
  c.fillText(axis['mx'], 50, 300, 200);
}

function onDown(e) {
  // マウスが押された座標を取得
  var x = e.clientX;
  var y = e.clientY;

  // オブジェクト上の座標かどうかを判定
  for (var i = 0;i < todo_list.length;i++) {
    if (todo_list[i].isTouched(x,y)) {
      todo_list[i].dragging = true; // ドラッグ開始
      break;
    }
  }
}

function onMove(e) {
  var cv = document.querySelector('#cv');
  var context = cv.getContext('2d');

  // マウスが移動した先の座標を取得
  var offsetX = cv.getBoundingClientRect().left;
  var offsetY = cv.getBoundingClientRect().top;
  var x = e.clientX - offsetX;
  var y = e.clientY - offsetY;

  // ドラッグが開始されていればオブジェクトの座標を更新して再描画
  for (var i = 0;i < todo_list.length;i++) {
    if (todo_list[i].dragging) {
      todo_list[i].x = x;
      todo_list[i].y = y;
      reset(context);
      todo_list[i].draw();
    }
  }
}

function onUp(e) {
  for (var i = 0;i < todo_list.length;i++) {
    if (todo_list[i].dragging) {
      todo_list[i].dragging = false; // ドラッグ終了
    }
  }
}

function reset(ctx) {
  ctx.clearRect(0, 0, cv.width, cv.height);
  drawLine(ctx);
  for (var i = 0;i < todo_list.length;i++) {
    if (!todo_list[i].dragging) {
      todo_list[i].draw();
    }
  }
}
