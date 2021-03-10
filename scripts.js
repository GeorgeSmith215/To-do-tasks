$(function(){

    // 获取DOM信息并保存
    var $notComp = $('.notcomp');
    var $comp = $('.comp');
    var $taskWindow = $('.task-window');
    var $taskText = $('.txtb');

    // PHP文件所在地址
    var urlPre = 'http://localhost/phpTask/';


    // 获取taskItem模板
    var $taskItemTemplateComp = $('#memo-item-template-comp').html();
    var $taskItemTemplateNotComp = $('#memo-item-template-noComp').html();


    // DOM中增加taskItem的函数
    function addTaskItem(taskItem){
        if(taskItem.isComp == true){
            $comp.append(Mustache.render($taskItemTemplateComp,taskItem));
        }
        else $notComp.append(Mustache.render($taskItemTemplateNotComp,taskItem));
    }



    // 从数据库中获取task并更新到DOM
    $.ajax({
        //请求方式
        type : "GET",
        //请求地址
        url : urlPre + "tasks.php",
        // dataType:'json',
        crossDomain: true,
        //请求成功
        success : function(tasks) {
            // console.log(tasks);
            let tasksJson = eval('(' + tasks + ')');
            $.each(tasksJson,function(i,task){
                addTaskItem(task);
                // console.log(task);
            });
        },
        //请求失败，包含具体的错误信息
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            //这个error函数调试时非常有用，如果解析不正确，将会弹出错误框
            console.log(XMLHttpRequest.responseText); 
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus); // parser error;
        }
    });




    // 新增Task到数据库中并更新到DOM
    var addTask = function(){
        // let task = $("<div class='task'></div>").text($taskText.val());
        // let del = $("<i class='fas fa-trash-alt itemBtn'></i>").click(function(){
        //     var p = $(this).parent();
        //     p.fadeOut(function(){
        //         p.remove();
        //     });
        // });
        // let check = $("<i class='fas fa-check itemBtn'></i>").click(function(){
        //     var p = $(this).parent();
        //     p.fadeOut(function(){
        //         $(".comp").append(p);
        //         p.fadeIn();
        //     });
        //     $(this).remove();
        // });

        // task.append(del,check);
        // $(".notcomp").append(task);

        // console.log($taskText.val());


        var taskItem = {
            task: $taskText.val(),
            isComp: 0
        };
        $taskText.val("");
        
        $.ajax({
            type:'POST',
            url:urlPre + 'taskAdd.php',
            // data:JSON.stringify(commodity),
            data:taskItem,
            crossDomain: true,
            dataType:"json",
            success: function(newTasks){
                // console.log(newTasks);
                addTaskItem(newTasks);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //这个error函数调试时非常有用，如果解析不正确，将会弹出错误框
                // console.log('fail');
                alert("Add failed!Please check your input,can not have illegal character!");
                console.log(XMLHttpRequest.responseText); 
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus); // parser error;
            }
        });
    }



    // 删除task并更新DOM
    $taskWindow.delegate('.fa-trash-alt','click',function(){
        // console.log('ok');
        // console.log(this);
        let $taskItem = $(this).closest('.memo-item');

        $(this).before('<i class="fa fa-spinner" aria-hidden="true"></i>');
        $(this).remove();
        
        // console.log($taskItem);

        $.ajax({
            type:'DELETE',
            // dataType:"text",
            crossDomain: true,
            url: urlPre + 'taskDelete.php?'+ $taskItem.attr('data-id'),
            success: function(newGoods){
                // console.log('Success');
                // parent.location.reload();
                // console.log(newGoods);
                $taskItem.fadeOut(function(){
                    $(this).remove();
                });
            },
            error: function(XMLHttpRequest, textStatus) {
                //这个error函数调试时非常有用，如果解析不正确，将会弹出错误框
                // console.log('fail');
                console.log(XMLHttpRequest.responseText); 
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus); // parser error;
            }
        });
    });



    // 未完成的task标记为已完成并更新数据库与DOM
    $taskWindow.delegate('.fa-check','click',function(){
        let $taskItem = $(this).closest('.memo-item');
        $(this).before('<i class="fa fa-spinner" aria-hidden="true"></i>');
        $(this).remove();

        // var commodity = {
        //     id: $taskItem.attr('data-id')
        // };

        // $taskItem.fadeOut(function(){
        //     $(".comp").append($taskItem);
        //     $taskItem.fadeIn();
        // });
        // $(this).remove();

        $.ajax({
            type:'PUT',
            url: urlPre + 'taskCheck.php?' + $taskItem.attr('data-id'),
            // data:JSON.stringify(commodity),
            // data:commodity,
            crossDomain: true,
            dataType:"json",
            success: function(taskCheck){
                // console.log(taskCheck);
                $taskItem.fadeOut(function(){
                    addTaskItem(taskCheck);
                    $(this).remove();
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //这个error函数调试时非常有用，如果解析不正确，将会弹出错误框
                console.log(XMLHttpRequest.responseText); 
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus); // parser error;
            }
        });
    });




    // 已完成的task回到未完成并更新数据库与DOM
    $taskWindow.delegate('.fa-times','click',function(){
        let $taskItem = $(this).closest('.memo-item');
        $(this).before('<i class="fa fa-spinner" aria-hidden="true"></i>');
        $(this).remove();

        $.ajax({
            type:'PUT',
            url: urlPre + 'taskCheck.php?' + $taskItem.attr('data-id'),
            // data:JSON.stringify(commodity),
            // data:commodity,
            crossDomain: true,
            dataType:"json",
            success: function(taskCheck){
                // console.log(taskCheck);
                $taskItem.fadeOut(function(){
                    addTaskItem(taskCheck);
                    $(this).remove();
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //这个error函数调试时非常有用，如果解析不正确，将会弹出错误框
                console.log(XMLHttpRequest.responseText); 
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus); // parser error;
            }
        });
    });

    
            
    // 增加task文本按下回车则增加task
    $taskText.on("keyup",function(event){
        if(event.keyCode == 13 && $taskText.val() != ""){
            addTask();
        }
    })

    // 按下task文本旁的按钮也增加task
    $('#taskAddBtn').click(function(){
        if($taskText.val() != ""){
            addTask();
        }
    });

})