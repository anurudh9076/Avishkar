const roomName = JSON.parse(document.getElementById('room-name').textContent);

        const chatSocket = new WebSocket(
            'ws://'
            + window.location.host
            + '/ws/board/'
            + roomName
            + '/'
        );

        

        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

      



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
      chatSocket.send(JSON.stringify({
        'X': e.clientX,
        'Y': e.clientY
    }));
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();

     
      ctx.beginPath();
      ctx.moveTo(e.clientX,e.clientY);
     

  }
  
  canvas.addEventListener("mousedown",startPosition);
  canvas.addEventListener("mouseup",finishPosition);
  canvas.addEventListener("mousemove",draw); 

  chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "red";
    ctx.lineTo(data.X, data.Y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(data.X,data.Y);
    ctx.beginPath();

};
  
  });

 
  

