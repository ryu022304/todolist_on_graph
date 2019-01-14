## TODOリストをグラフ上に動的に配置するWebアプリ
### 概要  
Twitterで見かけた画像が面白かったので再現して見た、Djangoを用いたTODOリストアプリ。  
2次元グラフ上に動的に配置して優先度を可視化する。

### 実行  
1. 「Clone or download」をクリック
2. 「Download Zip」
3. ダウンロードしたZipファイルを解凍
4. ターミナルで解凍したフォルダまで移動
5. cd mysite/
6. python manage.py runserver
7. localhost:8000にブラウザでアクセスする

### 使用方法  
1. TODOを追加する  
2. グラフ中にTODO内容が表示される
3. 各軸の内容を設定する
4. TODO内容をドラッグして整理する

###  例
![todo](https://user-images.githubusercontent.com/33801040/51103249-5fb40280-1825-11e9-8661-cc769b23c86b.gif)

### 参考  
[はじめてのDjango Part2 [実践編] ToDoリスト作成](https://qiita.com/morudara/items/f1b45cb0cda863d4b193)

### 備考  
急いで作成したので、バグは折を見て修正する
