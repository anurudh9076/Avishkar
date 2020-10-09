$(".img").tooltip({
    show:{effect:"highlight",duration:1000}
})

$("#btn1").click(function(){
   $("#sel").dialog({
       title: "Edit",
       height:310,
       width: 15,
       draggable: true

   });
});

window.addEventListener('load', () =>{
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");              //ctx for context
  
    //To change sixe of board on changing the size of window
  window.addEventListener('resize',resizeCanvas,false);
   function resizeCanvas(){
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  
  }
  resizeCanvas();
  
  
  let painting = false;
   
  function startPosition(e){
      painting = true;
      draw(e);
  }
  function finishPosition(){
      painting = false;
      ctx.beginPath();
  }
  function draw(e){
      if(!painting) return;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.strokeStyle = "red";
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
  
      ctx.beginPath();
      ctx.moveTo(e.clientX,e.clientY);
  
  }
  
  canvas.addEventListener("mousedown",startPosition);
  canvas.addEventListener("mouseup",finishPosition);
  canvas.addEventListener("mousemove",draw); 
  
  });
  