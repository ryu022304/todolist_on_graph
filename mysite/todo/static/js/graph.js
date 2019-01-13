window.addEventListener('DOMContentLoaded',
  function() {
    if (HTMLCanvasElement) {
      var cv = document.querySelector('#cv');
      var c = cv.getContext('2d');
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

      // 図形の描画
      init()
      // マウスでクリックされた時の動作
      cv.addEventListener('mousedown', onDown, false);
      cv.addEventListener('mousemove', onMove, false);
      cv.addEventListener('mouseup', onUp, false);
    }
  }
);

var x, y, relX, relY;
var dragging = false;

function onDown(e) {
  // キャンバスの左上端の座標を取得
  var offsetX = cv.getBoundingClientRect().left;
  var offsetY = cv.getBoundingClientRect().top;

  // マウスが押された座標を取得
  x = e.clientX - offsetX;
  y = e.clientY - offsetY;

  // オブジェクト上の座標かどうかを判定
  if (objX < x && (objX + objWidth) > x && objY < y && (objY + objHeight) > y) {
    dragging = true; // ドラッグ開始
    relX = objX - x;
    relY = objY - y;
  }
}
function onMove(e) {
  // キャンバスの左上端の座標を取得
  var offsetX = cv.getBoundingClientRect().left;
  var offsetY = cv.getBoundingClientRect().top;

  // マウスが移動した先の座標を取得
  x = e.clientX - offsetX;
  y = e.clientY - offsetY;

  // ドラッグが開始されていればオブジェクトの座標を更新して再描画
  if (dragging) {
    objX = x + relX;
    objY = y + relY;
    drawRect();
  }
}

function onUp(e) {
  dragging = false; // ドラッグ終了
}

function drawRect() {
  cv.getContext('2d').clearRect(0, 0, cv.width, cv.height); // キャンバスをクリア
  cv.getContext('2d').fillRect(objX, objY, objWidth, objHeight);
  cv.getContext('2d').stroke();
}

function init() {
  // オブジェクトの大きさを定義
  objWidth = 50;
  objHeight = 50;

  // オブジェクトの座標を定義(キャンバスの中央に表示)
  objX = cv.width / 2 - objWidth / 2;
  objY = cv.height / 2 - objHeight / 2;

  // オブジェクトを描画
  cv.getContext('2d').fillRect(objX, objY, objWidth, objHeight);
}
