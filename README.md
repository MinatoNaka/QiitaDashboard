# 概要

Vue.js勉強用のプロジェクト。  

QiitaAPIを利用し、Qiita本家のマイページでは確認できない様々なデータを  
ダッシュボードとして表示するアプリ。  
  

一日ごとのLGTM数の遷移や、各記事のPV数、ストック数、LGTM率、  
色々な軸での記事ランキング表示などが可能。  
  
    
完成品をGitHubPagesで公開している。  
https://minatonaka.github.io/QiitaDashboard/  
  
  
GitHubPages環境では、サンプルデータを静的表示している状態。  
ローカル環境ではその日の最新データを取得して表示可能。  
  
  
# 使用技術  

ベースはVue.jsを使用。  
QiitaAPIを使用しQiitaデータを取得。  
highchartsを使用しグラフを描画。  
アプリ全体のレイアウトはbootstrap-vueを使用。  
  
  

# サンプルデータ更新方法

・ローカル環境を起動  
`npm run serve`
  
  
・ローカル環境にアクセス  
`http://localhost:8080/QiitaDashboard`  
  

・画面右上の「自分のデータを表示」からAPIトークン入力  
→自動で最新データが取得される  
  

・VuedevtoolsのVuexで、「userItems」「userLgtmsByItem」「userProfile」の値をコピー  
  

・ソースコードの `/src/assets` 配下にある各サンプルデータファイルに値をペースト  
  

・コードをビルド  
`npm run build`  
  

・コードをGitHubにプッシュ  
  
