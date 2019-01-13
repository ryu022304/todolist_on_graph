window.addEventListener('DOMContentLoaded',
  function() {
    if (HTMLCanvasElement) {
      var cv = document.querySelector('#cv');
      var context = cv.getContext('2d');

      // 軸の描画
      drawLine(context);

      // 図形の描画
      test = new Todo(cv,'test',0,0);
      test.draw();

      // マウスでクリックされた時の動作
      cv.addEventListener('mousedown', function(){onDown(event,test);}, false);
      cv.addEventListener('mousemove', function(){onMove(event,test);}, false);
      cv.addEventListener('mouseup', onUp, false);
    }
  }
);

// TODOリストのコンストラクタ設定
var Todo = function(cv, text, x, y){
  this.cv = cv
  this.text = text;
  this.x = cv.width/2;
  this.y = cv.height/2;
}

// TODOリストのprototype設定
Todo.prototype = {
    //TODOの描画
    draw: function() {
        ctx = this.cv.getContext('2d');
        text = this.text;
        ctx.font = "30px serif";
        metrics = ctx.measureText(text);
        ctx.strokeRect(this.x, this.y, metrics.width, -24);
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
      return (this.x < x && (this.x + metrics.width) > x && this.y-24 < y && this.y > y);
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
}

var x, y, relX, relY;
var dragging = false;

function onDown(e,todo) {
  // オブジェクト上の座標かどうかを判定
  if (todo.isTouched) {
    dragging = true; // ドラッグ開始
  }
}

function onMove(e,todo) {
  var cv = document.querySelector('#cv');
  var context = cv.getContext('2d');
  // キャンバスの左上端の座標を取得
  var offsetX = cv.getBoundingClientRect().left;
  var offsetY = cv.getBoundingClientRect().top;

  // マウスが移動した先の座標を取得
  x = e.clientX - offsetX;
  y = e.clientY - offsetY;

  // ドラッグが開始されていればオブジェクトの座標を更新して再描画
  if (dragging) {
    todo.x = x;
    todo.y = y;
    reset(context);
    todo.draw();
  }
}

function onUp(e) {
  dragging = false; // ドラッグ終了
}

function reset(ctx) {
  ctx.clearRect(0, 0, cv.width, cv.height);
  ctx.stroke();
}
