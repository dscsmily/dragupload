# dragupload

多个图片拖拽上传，和点击上传

## [demo](http://htmlpreview.github.io/?https://github.com/dscsmily/dragupload/blob/master/dragupload.html)




## 主要方法


      var file = event.dataTransfer.files;
       
      var xhr = new XMLHttpRequest();
      
      xhr.open("POST", "00.php", true);
      
      xhr.upload.onprogress
      
      xhr.send(formData);


## 核心代码

    function Up_ondrop(event) { 
    
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
	 



#  演示方法

下载到本地服务即可
