var dragupload = {};//定义一个对象
var dragarea = null;
var ul = null
dragupload.loadarea = (function(){
	 
	  
	/*ondragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
	ondragover - 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
	ondragleave - 
	ondrop - 在一个拖动过程中，释放鼠标键时触发此事件*/
	
	//阻止拖动时浏览器的默认事件   vent.preventDefault();
	
	//当被鼠标拖动的对象进入其容器范围内时触发此事件
	function Up_ondragenter(event){
		event.preventDefault(); 
		$('.dragarea').addClass('over');
		}
	function Up_ondragover(event){event.preventDefault();}
	
	//当被鼠标拖动的对象离开其容器范围内时触发此事件
	function Up_ondragleave(event){
		event.preventDefault();
		$('.dragarea').removeClass('over');
	}
	
	//ondrop - 在一个拖动过程中，释放鼠标键时触发此事件
	function Up_ondrop(event){
		event.preventDefault();
		$('.dragarea').removeClass('over'); 
		
		cleartxt();
		
		//定义拖入的文件的
		var file = event.dataTransfer.files;
		var filecount =file.length;
		console.log(filecount);
		for(i=0; i < filecount; i++){
			fileupload(file[i]); 
			}
		
		
	}
	
	//上传是清空$('.dragarea')
	function cleartxt(){ 
		 if($('li').length > 0 ){ 
			 return;
			 }else{ 
			$('.dragarea').html('');
			$('.dragarea').css({'background':'#fff'});
			$('.dragarea').append(ul);
			}
		}
	
	
	function fileupload(file){ 
		//判断被拖入的文件是否为图片格式
		   if (!/image\/\w+/.test(file.type)) {
			alert("请确保上传文件为图像类型");
			return false;
			}   
		    //new一个
		    var reader = new FileReader(); 
		   //将文件以Data URL形式读入页面    
		    
		   reader.onload=function(e){    
		   			var formData = new FormData(); 
					var li ="<li class='new'><img src='"+this.result+"'></li>";
					var span="<span><progress class='load' max='100' value='10'></progress></span>"
					var img="<img src='img/ok.png'>"  
					$('.dragarea').find('ul').append(li);
					$('.dragarea').find('li.new').append(span); 
					  
					formData.append("upload", file);
					
					console.log(file)
					
					var xhr = new XMLHttpRequest();   
					
					xhr.open("POST", "00.php", true);  
					
					xhr.upload.onprogress =  function updateProgress(event) {
						 var percent = 0;
						if(event.lengthComputable) {
							var percent = event.loaded / event.total*100;
							console.log(percent)
							$('.load').val(percent);
							if(percent >= 100){
								$('li.new').find('span').html('')
								$('li.new').find('span').append(img);
								$('li.new').find('span').css({'background':'none'});
								$('li.new').removeClass();
								} 
						}
					};
					
						  
				    xhr.send(formData);
					 
					 
					
					 
					 
					/*$.post('upload.php',{base64:data,img_type:img_type[1]},function(data){
						setTimeout(function(){
							$('.dragarea li.new span').html('');
							$('.dragarea li.new span').append(img)
							$('.dragarea span').find('img').attr('src','ok.png');
							$('.dragarea span').css({'background':'none'});
							$('.dragarea li').removeClass('new').addClass('ok');
							},1000)
						
					})*/
			}   
			reader.readAsDataURL(file); 
	 }
	 
	 
	 function C_lick(){ 
		 $('#upload').click(); 
		 }
		 
	function changload(){ 
				var upload = document.getElementById('upload'); 
			    var fileList=upload.files;
				var filecon = fileList.length;
				cleartxt();
				//$('.dragarea').append(ul);
				for( var i = 0 ; i < filecon ; i++ ){  
				  
				  fileupload(fileList[i]);
				}  
			 
			 }	 
		  
	 //初始化
	 function upinit(){ 
	 	 ul ='<ul></ul>'
		 dragarea = document.getElementById('dragareaup');  
		 dragarea.ondragenter = Up_ondragenter;
		 dragarea.ondragover = Up_ondragover;
		 dragarea.ondragleave = Up_ondragleave;
		 dragarea.ondrop = Up_ondrop;
		 dragarea.onclick = C_lick; 
		 $('#upload').change(changload); 
		 }
	 
	 

return {init:upinit}
})()
