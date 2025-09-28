const out=document.getElementById('output');
const inp=document.getElementById('cmd');
const cmds={
 help:`Доступные команды:
  - snake   : запустить игру
  - резюме не будет : hahahaha
  - back    : перейти на главную`,
 back: ()=>location.href='index.html',
 snake:runSnake
};
function println(t=''){out.textContent+=t+'\n';out.scrollTop=out.scrollHeight;}
inp.addEventListener('keydown',e=>{
 if(e.key==='Enter'){
   const val=inp.value.trim();
   println('> '+val);
   inp.value='';
   if(cmds[val]) typeof cmds[val]==='function'?cmds[val]():println(cmds[val]);
   else println('Команда не найдена');
 }
});
function runSnake(){
 println('Игра "Snake": управляйте стрелками, Esc – выход');
 let size=20, dir=1, snake=[210,211,212], food=115;
 const board=[...Array(size*size)].map(_=>' ');
 function render(){
   let s=''; board.fill(' ');
   snake.forEach(i=>board[i]='O');
   board[food]='X';
   for(let i=0;i<board.length;i++){
     s+=board[i];
     if((i+1)%size===0) s+='\n';
   }
   out.textContent=s;
 }
 function placeFood(){
   do{food=Math.floor(Math.random()*size*size);}
   while(snake.includes(food));
 }
 function step(){
   let head=snake[snake.length-1];
   let row=Math.floor(head/size), col=head%size;
   if(dir===0) col=(col-1+size)%size;
   if(dir===1) col=(col+1)%size;
   if(dir===2) row=(row-1+size)%size;
   if(dir===3) row=(row+1)%size;
   head=row*size+col;
   if(snake.includes(head)){return gameOver();}
   snake.push(head);
   if(head===food){placeFood();}
   else snake.shift();
   render();
 }
 function gameOver(){
   clearInterval(loop);
   println('Game Over! Счёт: '+snake.length);
 }
 placeFood(); render();
 const loop=setInterval(step,150);
 window.onkeydown=e=>{
   if(e.key==='ArrowLeft') dir=0;
   if(e.key==='ArrowRight') dir=1;
   if(e.key==='ArrowUp') dir=2;
   if(e.key==='ArrowDown') dir=3;
   if(e.key==='Escape') gameOver();
 };

}