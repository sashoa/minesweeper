!function e(n,t,i){function r(o,s){if(!t[o]){if(!n[o]){var d="function"==typeof require&&require;if(!s&&d)return d(o,!0);if(a)return a(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var u=t[o]={exports:{}};n[o][0].call(u.exports,function(e){var t=n[o][1][e];return r(t?t:e)},u,u.exports,e,n,t,i)}return t[o].exports}for(var a="function"==typeof require&&require,o=0;o<i.length;o++)r(i[o]);return r}({1:[function(e,n,t){"use strict";function i(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=e("./Field.js"),a=function(e){return e&&e.__esModule?e:{default:e}}(r),o=e("random-seed"),s=function e(n){function t(e,n){for(var t=n.seedKey?o.create(n.seedKey):o.create(),i=n.numberOfRows*n.numberOfColumns,r=[],a=0;a<i;a++)r[a]=a;r.sort(function(){return t.floatBetween(-.5,.5)});for(var s=r.slice(0,n.numberOfBombs),d=0;d<e.length;d++)s.indexOf(d)!==-1&&(e[d].value="bomb")}function r(e,n){for(var t=0;t<e.length;t++)for(var i=e[t],r=0;r<i.length;r++)"bomb"!==e[t][r].value&&(e[t][r].value=s(e,t,r))}function s(e,n,t){var i=0,r=void 0;return e[n-1]&&(r=e[n-1][t-1],d(r)&&i++,r=e[n-1][t],d(r)&&i++,r=e[n-1][t+1],d(r)&&i++),r=e[n][t-1],d(r)&&i++,r=e[n][t+1],d(r)&&i++,e[n+1]&&(r=e[n+1][t-1],d(r)&&i++,r=e[n+1][t],d(r)&&i++,r=e[n+1][t+1],d(r)&&i++),0===i?null:i}function d(e){return void 0!==e&&"bomb"===e.value}i(this,e),n=function(e){var n={};switch(n.seedKey=e.hasOwnProperty("seedKey")?e.seedKey:null,e.difficulty){case"custom":if(!(e.hasOwnProperty("numberOfRows")&&e.hasOwnProperty("numberOfColumns")&&e.hasOwnProperty("numberOfBombs")))throw new Error("Custom options must have numberOfRows, numberOfColumns and numberOfBombs");var t=e.numberOfRows,i=e.numberOfColumns,r=e.numberOfBombs,a=Math.round(t*i*.6);t>24&&(t=24),t<9&&(t=9),i>30&&(i=30),i<9&&(i=9),r>a&&(r=a),r<10&&(r=10),n.difficulty="custom",n.numberOfRows=t,n.numberOfColumns=i,n.numberOfBombs=r;break;case"easy":n.difficulty="easy",n.numberOfRows=9,n.numberOfColumns=9,n.numberOfBombs=Math.round(12.15);break;case"medium":n.difficulty="medium",n.numberOfRows=16,n.numberOfColumns=16,n.numberOfBombs=Math.round(46.08);break;case"hard":n.difficulty="hard",n.numberOfRows=24,n.numberOfColumns=30,n.numberOfBombs=Math.round(180);break;default:throw new Error("Invalid difficulty value")}return n}(n),this.grid=function(e){for(var n=e.numberOfRows,i=e.numberOfColumns,o=n*i,s=[],d=0;d<o;d++)s[d]=new a.default;t(s,e);for(var l=[],u=0;u<n;u++){for(var c=[],m=0;m<i;m++)c.push(s.shift());l.push(c)}return r(l,e),l}(n)};t.default=s},{"./Field.js":2,"random-seed":7}],2:[function(e,n,t){"use strict";function i(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function e(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;i(this,e),this.isOpened=!1,this.isMarked=!1,this.value=n};t.default=r},{}],3:[function(e,n,t){"use strict";function i(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(n,t,i){return t&&e(n.prototype,t),i&&e(n,i),n}}(),a=e("./Board.js"),o=function(e){return e&&e.__esModule?e:{default:e}}(a),s=function(){function e(n){var t=this;i(this,e),this.board=new o.default(n),this.isGameOver=!1,this.gameStatus="playing",this.markedFields=0,this.numberOfMines=this.getNumberOfMines(),this.availableHints=3,this.availableLives=1,this.timescore=0,this.timer=setInterval(function(){t.timescore++},1e3)}return r(e,[{key:"getNumberOfMines",value:function(){for(var e=0,n=this.board.grid,t=0;t<n.length;t++)for(var i=n[t],r=0;r<i.length;r++){var a=i[r];"bomb"===a.value&&e++}return e}},{key:"openField",value:function(e,n){var t=this.board.grid[e][n];return t.isOpened=!0,"bomb"===t.value&&(this.availableLives>0?this.availableLives--:(this.isGameOver=!0,this.gameStatus="defeated")),this.checkVictory(),t.value}},{key:"toggleMarkField",value:function(e,n){var t=this.board.grid[e][n];return t.isOpened?null:(t.isMarked?(this.markedFields--,t.isMarked=!1):(this.markedFields++,t.isMarked=!0),t.isMarked)}},{key:"getHint",value:function(){if(0===this.availableHints)return null;this.availableHints--;for(var e=[],n=this.board.grid,t=0;t<n.length;t++)for(var i=n[t],r=0;r<i.length;r++){var a=i[r];a.isOpened&&this.getNeighbourNonBombFields({x:t,y:r},e)}return e[Math.floor(Math.random()*e.length)]}},{key:"getNeighbourNonBombFields",value:function(e,n){var t=e.x-1,i=e.y-1;this.potentialHint({x:t,y:i})&&n.push({x:t,y:i}),t=e.x-1,i=e.y,this.potentialHint({x:t,y:i})&&n.push({x:t,y:i}),t=e.x-1,i=e.y+1,this.potentialHint({x:t,y:i})&&n.push({x:t,y:i}),t=e.x,i=e.y-1,this.potentialHint({x:t,y:i})&&n.push({x:t,y:i}),t=e.x,i=e.y+1,this.potentialHint({x:t,y:i})&&n.push({x:t,y:i}),t=e.x+1,i=e.y-1,this.potentialHint({x:t,y:i})&&n.push({x:t,y:i}),t=e.x+1,i=e.y,this.potentialHint({x:t,y:i})&&n.push({x:t,y:i}),t=e.x+1,i=e.y+1,this.potentialHint({x:t,y:i})&&n.push({x:t,y:i})}},{key:"potentialHint",value:function(e){var n=this.board.grid,t=e.x,i=e.y;return!(!n[t]||!n[t][i])&&(!n[t][i].isMarked&&!n[t][i].isOpened&&!("bomb"===n[t][i].value||!Number.isInteger(n[t][i].value)))}},{key:"minesLeft",value:function(){return this.numberOfMines-this.markedFields}},{key:"checkVictory",value:function(){for(var e=[],n=this.board.grid,t=0;t<n.length;t++)for(var i=n[t],r=0;r<i.length;r++){var a=i[r];"bomb"!==a.value&&e.push(a)}e.every(function(e){return e.isOpened})&&(this.gameStatus="victory")}}]),e}();t.default=s},{"./Board.js":1}],4:[function(e,n,t){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(){a(),document.getElementById("createGame").addEventListener("click",function(e){e.preventDefault(),u(o())})}function a(){F.minesweeperApp=document.getElementById("minesweeperApp"),F.minesweeperApp.innerHTML="",F.minesweeperApp.appendChild((0,j.default)());var e=document.getElementById("customOptions"),n=document.getElementById("difficulty");n.addEventListener("change",function(t){var i=n.value;"custom"==i&&e.classList.contains("hidden")?e.classList.remove("hidden"):e.classList.add("hidden")})}function o(){var e={};return e.difficulty=document.getElementById("difficulty").value,"custom"==e.difficulty&&(e.numberOfRows=document.getElementById("numberOfRows").value,e.numberOfColumns=document.getElementById("numberOfColumns").value,e.numberOfBombs=document.getElementById("numberOfMines").value),e.seedKey=document.getElementById("seedKey").value,F.options=e,e}function s(){return null==localStorage.getItem("localScores")&&localStorage.setItem("localScores",JSON.stringify([])),JSON.parse(localStorage.getItem("localScores"))}function d(){var e=document.querySelector(".scoreboard tbody");e.innerHTML="";var n=F.getLocalScores();n.sort(k);for(var t=0;t<n.length;t++){var i=n[t],r=document.createElement("tr");r.innerHTML='<tr>\n                      <th scope="row">'+(t+1)+"</th>\n                      <td>"+i.name+"</td>\n                      <td>"+i.gameKey+"</td>\n                      <td>"+i.difficulty+"</td>\n                      <td>"+f(i.time)+"</td>\n                    </tr>",e.appendChild(r)}}function l(e){var n={},t=F.getLocalScores();if(n.name=document.getElementById("playerName").value,n.gameKey=F.options.seedKey,n.difficulty="custom"==F.options.difficulty?"custom ("+F.options.numberOfRows+" x "+F.options.numberOfColumns+")":F.options.difficulty,n.time=F.minesweeper.timescore,t.some(function(e){return e.name==n.name&&e.difficulty==n.difficulty&&e.gameKey==n.gameKey})){var i=t.find(function(e){return e.name==n.name});if(i.time>n.time)return i.time=n.time,void localStorage.setItem("localScores",JSON.stringify(t));if(i.time<n.time)return}t.push(n),localStorage.setItem("localScores",JSON.stringify(t))}function u(e){F.minesweeper=new A.default(e),F.minesweeperApp=document.getElementById("minesweeperApp"),F.indicators=C(F.minesweeper),F.board=T(F.minesweeper),F.board.addEventListener("mousedown",p),F.board.addEventListener("contextmenu",function(e){return e.preventDefault()}),F.minesweeperApp.innerHTML="",F.minesweeperApp.appendChild(F.indicators),F.minesweeperApp.appendChild(F.board),c();var n=document.createElement("DIV"),t=document.createElement("BUTTON");t.id="getHint",t.className="btn btn-primary btn-sm",t.innerText="Get Hint",t.addEventListener("click",h);var i=document.createElement("BUTTON");i.className="btn btn-sm btn-secondary",i.innerText="New Game",i.addEventListener("click",function(){F.minesweeper.gameStatus="defeated",r()}),n.appendChild(t),n.appendChild(i),minesweeperApp.appendChild(n),m()}function c(){F.victoryModal=N({modalId:"victoryModal",modalLabelId:"victoryLabel",closeBtnLabel:"Back",yesBtnLabel:"Save Score",modalTitle:"Victory"});var e=F.victoryModal.querySelector(".modal-body"),n=document.createElement("DIV");n.className="input-group",n.innerHTML='<span class="input-group-addon">Name</span>\n                         <input type="text" id="playerName" class="form-control" placeholder="Your Name">',e.appendChild(n),F.victoryModal.querySelector("#modalAnswerYes").addEventListener("click",function(){l(),$("#victoryModal").modal("hide")}),F.defeatedModal=N({modalId:"defeatedModal",modalLabelId:"defeatedLabel",closeBtnLabel:"No",yesBtnLabel:"Yes",modalTitle:"Defeated"}),F.defeatedModal.querySelector("#modalAnswerYes").addEventListener("click",function(){$("#defeatedModal").modal("hide"),r()}),F.minesweeperApp.appendChild(F.victoryModal),F.minesweeperApp.appendChild(F.defeatedModal)}function m(){var e=setInterval(function(){"defeated"==F.minesweeper.gameStatus&&clearInterval(e),document.getElementById("timescore").innerText=f(F.minesweeper.timescore)},1e3)}function f(e){return("00"+Math.floor(e/60)).slice(-2)+":"+("00"+e%60).slice(-2)}function p(e){0==e.button&&y(e),2==e.button&&O(e),I(),v()}function v(){switch(F.minesweeper.gameStatus){case"playing":return;case"victory":B();break;case"defeated":E()}}function y(e){var n=e.target;if(n.classList.contains("field")){var t=parseInt(n.dataset.row),i=parseInt(n.dataset.col),r=F.minesweeper.board.grid[t][i];if(!r.isOpened&&!r.isMarked){var a=F.minesweeper.openField(t,i);"bomb"===a?(n.classList.add("opened"),n.innerHTML="&#128165;"):null===a?L([{x:t,y:i}]):(n.classList.add("opened"),n.innerText=r.value)}}}function h(e){var n=F.minesweeper.getHint();if(null!==n){var t=n.x,i=n.y,r=document.querySelector('[data-row="'+t+'"][data-col="'+i+'"]');r.classList.add("animated"),r.classList.add("flash"),I()}}function b(e){var n=F.minesweeper.board.grid,t=e.x,i=e.y,r=n[t][i];F.minesweeper.openField(t,i);var a=document.querySelector('[data-row="'+t+'"][data-col="'+i+'"]');a.innerHTML=r.value||"",a.classList.add("opened")}function g(e){var n=F.minesweeper.board.grid,t=e.x,i=e.y;return!(!n[t]||!n[t][i])&&(n[t][i].isOpened!==!0&&null===n[t][i].value)}function x(e,n){return n.some(function(n){return n.x==e.x&&n.y==e.y})}function w(e){var n=F.minesweeper.board.grid,t=e.x,i=e.y;return!(!n[t]||!n[t][i])&&(n[t][i].isOpened!==!0&&!!Number.isInteger(n[t][i].value))}function L(e){if(0!==e.length){var n=e.shift();b(n),M(n);var t=n.x-1,i=n.y;g({x:t,y:i})&&!x({x:t,y:i},e)&&e.push({x:t,y:i}),t=n.x,i=n.y+1,g({x:t,y:i})&&!x({x:t,y:i},e)&&e.push({x:t,y:i}),t=n.x+1,i=n.y,g({x:t,y:i})&&!x({x:t,y:i},e)&&e.push({x:t,y:i}),t=n.x,i=n.y-1,g({x:t,y:i})&&!x({x:t,y:i},e)&&e.push({x:t,y:i}),L(e)}}function M(e){var n=e.x-1,t=e.y-1;w({x:n,y:t})&&b({x:n,y:t}),n=e.x-1,t=e.y,w({x:n,y:t})&&b({x:n,y:t}),n=e.x-1,t=e.y+1,w({x:n,y:t})&&b({x:n,y:t}),n=e.x,t=e.y-1,w({x:n,y:t})&&b({x:n,y:t}),n=e.x,t=e.y+1,w({x:n,y:t})&&b({x:n,y:t}),n=e.x+1,t=e.y-1,w({x:n,y:t})&&b({x:n,y:t}),n=e.x+1,t=e.y,w({x:n,y:t})&&b({x:n,y:t}),n=e.x+1,t=e.y+1,w({x:n,y:t})&&b({x:n,y:t})}function O(e){var n=e.target;if(n.classList.contains("field")){var t=n.dataset.row,i=n.dataset.col;if(!F.minesweeper.board.grid[t][i].isOpened){var r=F.minesweeper.toggleMarkField(t,i);r&&(n.classList.add("flag"),n.innerHTML="&#9873;"),r===!1&&(n.innerHTML="")}}}function E(){F.board.removeEventListener("mousedown",p);var e=document.getElementById("minesweeperApp"),n=document.createElement("P");n.innerText="GAME OVER",n.classList.add("game-over"),e.appendChild(n),clearInterval(F.minesweeper.timer),F.defeatedModal.querySelector("#defeatedModal .modal-body").innerText="Defeated, Try again?",$("#defeatedModal").modal("show")}function B(){F.board.removeEventListener("mousedown",p);var e=document.getElementById("minesweeperApp"),n=document.createElement("P");n.innerText="VICTORY",n.classList.add("victory"),e.appendChild(n),clearInterval(F.minesweeper.timer);var t=F.victoryModal.querySelector("#victoryModal .modal-body");t.innerText="Victory, Your Time is: "+f(F.minesweeper.timescore);var i=document.createElement("DIV");i.className="input-group",i.innerHTML='<span class="input-group-addon">Name</span>\n                         <input type="text" id="playerName" class="form-control" placeholder="Your Name">',t.appendChild(i),$("#victoryModal").modal("show")}function I(){var e=document.getElementById("hintsLeft"),n=document.getElementById("livesLeft"),t=document.getElementById("minesLeft");e.innerText=F.minesweeper.availableHints,n.innerText=F.minesweeper.availableLives,t.innerText=F.minesweeper.minesLeft()}function C(e){var n=document.createElement("ul");n.id="indicators";var t=document.createElement("li");t.innerHTML='Time: <span id="timescore">00:00</span>',n.appendChild(t);var i=document.createElement("li");i.innerHTML='Lives left: <span id="livesLeft">'+F.minesweeper.availableLives+"</span>",n.appendChild(i);var r=document.createElement("li");r.innerHTML='Hints left: <span id="hintsLeft">'+F.minesweeper.availableHints+"</span>",n.appendChild(r);var a=document.createElement("li");return a.innerHTML='Mines left: <span id="minesLeft">'+F.minesweeper.minesLeft()+"</span>",n.appendChild(a),n}function T(e){var n=document.createElement("DIV");n.id="gameBoard";for(var t=e.board.grid,i=document.createDocumentFragment(),r=0;r<t.length;r++)for(var a=t[r],o=0;o<a.length;o++){var s=(a[o],S(r,o));0==o&&s.classList.add("clear-left"),i.appendChild(s)}return n.appendChild(i),n}function S(e,n){var t=document.createElement("DIV");return t.classList.add("field"),t.dataset.row=e,t.dataset.col=n,t}function N(e){var n=document.getElementById("myModal").cloneNode(!0);n.id=""+e.modalId,n.setAttribute("aria-labelledBy",e.modalLabelId);var t=n.querySelector("#exampleModalLabel");t.id=""+e.modalLabel,t.innerText=e.modalTitle;var i=n.querySelector(".modal-footer");if(e.closeBtnLabel){var r=document.createElement("BUTTON");r.className="btn btn-secondary",r.dataset.dismiss="modal",r.innerText=e.closeBtnLabel,i.appendChild(r)}if(e.yesBtnLabel){var a=document.createElement("BUTTON");a.id="modalAnswerYes",a.className="btn btn-primary",a.innerText=e.yesBtnLabel,i.appendChild(a)}return n}function k(e,n){return"hard"==e.difficulty?"hard"==n.difficulty?e.time-n.time:-1:"hard"==n.difficulty?"hard"==e.difficulty?e.time-n.time:1:"medium"==e.difficulty?"medium"==n.difficulty?e.time-n.time:-1:"medium"==n.difficulty?"medium"==e.difficulty?e.time-n.time:1:"easy"==e.difficulty?"easy"==n.difficulty?e.time-n.time:-1:"easy"==n.difficulty?"easy"==e.difficulty?e.time-n.time:1:void 0}var H=e("./Minesweeper.js"),A=i(H),_=e("./optionsUI.js"),j=i(_),F={getLocalScores:s,minesweeperApp:document.getElementById("minesweeperApp"),gameHome:document.getElementById("gameHome"),scoreBoard:document.getElementById("scoreBoard")};d();var R=document.getElementById("homeNavBtn"),q=document.getElementById("gameNavBtn"),D=document.getElementById("scoreBoardNavBtn");R.addEventListener("click",function(e){F.minesweeperApp.innerHTML="",F.minesweeperApp.appendChild(F.gameHome),F.minesweeperApp.classList.remove("hidden"),R.classList.add("active"),F.scoreBoard.classList.add("hidden"),D.classList.remove("active"),q.classList.remove("active")}),q.addEventListener("click",function(e){F.minesweeperApp.classList.remove("hidden"),q.classList.add("active"),F.scoreBoard.classList.add("hidden"),D.classList.remove("active"),R.classList.remove("active")}),D.addEventListener("click",function(e){F.minesweeperApp.classList.add("hidden"),R.classList.remove("active"),q.classList.remove("active"),F.scoreBoard.classList.remove("hidden"),D.classList.add("active"),d()}),document.getElementById("play").addEventListener("click",function(){r()})},{"./Minesweeper.js":3,"./optionsUI.js":5}],5:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=document.createElement("div");return e.classList.add("options"),e.innerHTML='\n                <h2>Game Options:</h2>\n                <div class="align-left">\n                <select id="difficulty" class="custom-select">\n                  <option selected disabled>Select Difficulty</option>\n                  <option value="easy">Easy</option>\n                  <option value="medium">Medium</option>\n                  <option value="hard">Hard</option>\n                  <option value="custom">Custom</option>\n                </select>\n                <div class="input-group">\n                  <span class="input-group-addon" id="addon1">Game Key</span>\n                  <input type="text" id="seedKey" class="form-control" placeholder="string">\n                </div>\n\n                <div id="customOptions" class="custom-options hidden">\n                    <h3>Custom options:</h3>\n                    <small class="form-text text-muted">Min: 9, Max: 24 rows</small>\n                    <div class="input-group">\n                      <span class="input-group-addon" id="basic-addon1">Rows</span>\n                      <input type="number" id="numberOfRows"class="form-control" placeholder="Number of Rows">\n                    </div>\n                    <small class="form-text text-muted">Min: 9, Max: 30 columns</small>\n                    <div class="input-group">\n                      <span class="input-group-addon" id="basic-addon2">Columns</span>\n                      <input type="number" id="numberOfColumns" class="form-control" placeholder="Number of Columns">\n                    </div>\n                    <small class="form-text text-muted">Min: 10, Max: 60% of total Fields (row * col)</small>\n                    <div class="input-group">\n                      <span class="input-group-addon" id="basic-addon3">Mines</span>\n                      <input type="number" id="numberOfMines" class="form-control" placeholder="Number of Mines">\n                    </div>\n                </div>\n                </div>\n\n                <div class="options-footer">\n                  <button id="createGame" class="btn btn-primary">Create Game</button>\n                </div>',e}},{}],6:[function(e,n,t){function i(e,n,t,i){return JSON.stringify(e,r(n,i),t)}function r(e,n){var t=[],i=[];return null==n&&(n=function(e,n){return t[0]===n?"[Circular ~]":"[Circular ~."+i.slice(0,t.indexOf(n)).join(".")+"]"}),function(r,a){if(t.length>0){var o=t.indexOf(this);~o?t.splice(o+1):t.push(this),~o?i.splice(o,1/0,r):i.push(r),~t.indexOf(a)&&(a=n.call(this,r,a))}else t.push(a);return null==e?a:e.call(this,r,a)}}t=n.exports=i,t.getSerialize=r},{}],7:[function(e,n,t){"use strict";var i=e("json-stringify-safe"),r=function(){var e=4022871197;return function(n){if(n){n=n.toString();for(var t=0;t<n.length;t++){e+=n.charCodeAt(t);var i=.02519603282416938*e;e=i>>>0,i-=e,i*=e,e=i>>>0,i-=e,e+=4294967296*i}return 2.3283064365386963e-10*(e>>>0)}e=4022871197}},a=function(e){return function(){var n,t,a=48,o=1,s=a,d=new Array(a),l=0,u=new r;for(n=0;n<a;n++)d[n]=u(Math.random());var c=function(){++s>=a&&(s=0);var e=1768863*d[s]+2.3283064365386963e-10*o;return d[s]=e-(o=0|e)},m=function(e){return Math.floor(e*(c()+1.1102230246251565e-16*(2097152*c()|0)))};m.string=function(e){var n,t="";for(n=0;n<e;n++)t+=String.fromCharCode(33+m(94));return t};var f=function(){var e=Array.prototype.slice.call(arguments);for(n=0;n<e.length;n++)for(t=0;t<a;t++)d[t]-=u(e[n]),d[t]<0&&(d[t]+=1)};return m.cleanString=function(e){return e=e.replace(/(^\s*)|(\s*$)/gi,""),e=e.replace(/[\x00-\x1F]/gi,""),e=e.replace(/\n /,"\n")},m.hashString=function(e){for(e=m.cleanString(e),u(e),n=0;n<e.length;n++)for(l=e.charCodeAt(n),t=0;t<a;t++)d[t]-=u(l),d[t]<0&&(d[t]+=1)},m.seed=function(e){void 0!==e&&null!==e||(e=Math.random()),"string"!=typeof e&&(e=i(e,function(e,n){return"function"==typeof n?n.toString():n})),m.initState(),m.hashString(e)},m.addEntropy=function(){var e=[];for(n=0;n<arguments.length;n++)e.push(arguments[n]);f(l+++(new Date).getTime()+e.join("")+Math.random())},m.initState=function(){for(u(),n=0;n<a;n++)d[n]=u(" ");o=1,s=a},m.done=function(){u=null},void 0!==e&&m.seed(e),m.range=function(e){return m(e)},m.random=function(){return m(Number.MAX_VALUE-1)/Number.MAX_VALUE},m.floatBetween=function(e,n){return m.random()*(n-e)+e},m.intBetween=function(e,n){return Math.floor(m.random()*(n-e+1))+e},m}()};a.create=function(e){return new a(e)},n.exports=a},{"json-stringify-safe":6}]},{},[4]);