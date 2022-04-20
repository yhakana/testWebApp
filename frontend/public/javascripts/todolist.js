/* 清空新增欄位 */
function clearList() {
    $('#title').val('');
    $('#content').val('');
}

/* 顯示目前已有的待辦事項 */
function showList(todo) {
    let status = (todo.status)? "checked" : "";                         // 項目狀態
    let titleClass = (todo.status)? "title_checked" : "title";          // 項目標題
    let contentClass = (todo.status)? "content_checked" : "content";    // 項目內容
    let editDisplay = (todo.status)? "none" : "inline";                 // 項目編輯按鈕display屬性

    let panel = 
        `<div class="showMyList" id="${todo._id}">
            <div class="${titleClass}">
                <input type="checkbox" onclick="changeStatus('${todo._id}', this)">
                <text id="title${todo._id}">${todo.title}</text>
                <div class="btnArea">
                    <button class="editBtn" id="deleteBtn" onclick="removeList('${todo._id}')">Delete</button>
                    <button class="editBtn" id="edit${todo._id}" style="display: ${editDisplay};" onclick="editList('${todo._id}')">edit</button>
                    <button class="editBtn" id="update${todo._id}" style="display: none;" onclick="updateList('${todo._id}')">update</button>
                </div>
            </div>
            <div class="${contentClass}">
                <text id="content${todo._id}">${todo.content}</text>
            </div>
        </div>`;

    $('.block2').append(panel);
}

getList();

function getList() {
    $.get('http://localhost:3003/todolist/getList', function(data, status) {
        for(let i = 0; i < data.length; i++) {
            showList(data[i]);
        }
    });
}

/* 新增待辦項目 */
function addList() {
    let _title = $('#title').val();
    let _content = $('#content').val();
    
    if (_title == '' || _content == '') {
        alert('您有未輸入的欄位');
    } else {
        
        $.post("http://localhost:3003/todolist/addList", {'title': _title, 'content': _content}, function(res) {
            showList(res.data);
            clearList();
        });
    }
}

/* 移除待辦項目 */
function removeList(id) {
    $.post('http://localhost:3003/todolist/removeList',{'id': id} , function(res) {
        if(res.status == 0) {
            $('#' + id).remove();
        }
    });
}

/* 編輯待辦項目 */
function editList(id) {
    $('#edit' + id).css("display", "none");
    $('#update' + id).css("display", "inline-flex");
    
    $('.btnArea').css('margin-left', '370px');

    let title_input = document.createElement('input');
    title_input.type = 'text';
    title_input.id = 'edit_title' + id;
    title_input.value = $('#title' + id).text();
    title_input.size = Math.max(25, 5);
    $('#title' + id).css('display', 'none');
    $('#title' + id).parent().find('text').after(title_input);
    $('#edit_title' + id).css('display', 'inline');

    let content_input = document.createElement('input');
    content_input.type = 'text';
    content_input.id = 'edit_content' + id;
    content_input.value = $('#content' + id).text();
    content_input.size = Math.max(30, 5);
    $('#content' + id).css('display', 'none');
    $('#content' + id).parent().append(content_input);
}

/* 更新待辦項目 */
function updateList(id) {
    let newTitle = $('#edit_title' + id).val();
    let newContent = $('#edit_content' + id).val();

    $('.btnArea').css('margin-left', '550px');

    $.post("http://localhost:3003/todolist/updateList", {'id': id, 'title': newTitle, 'content': newContent}, function(res) {
        if(res.status==0) {                             // 0表示修改成功
            $('#title' + id).text(newTitle);
            $('#content' + id).text(newContent);
        
            $('#edit' + id).css("display", "inline");
            $('#update' + id).css("display", "none");
        
            $('#title' + id).css('display', 'inline');
            $('#content' + id).css('display', 'inline');
        
            $('#edit_title' + id).remove();
            $('#edit_content' + id).remove();
        }
    });
}

/* 更新項目狀態 */
function changeStatus(id, checkbox) {
    let title = checkbox.parentNode;
    let content = title.nextElementSibling;

    $.post('http://localhost:3003/todolist/changeStatus', {'id': id, 'status': checkbox.checked}, function(res) {
        if (res.status==0) {
            if (checkbox.checked) {
                title.className = "title_checked";
                content.className = "content_checked";
                $('#edit' + id).css("display", "none");
                $('#update' + id).css("display", "none");
                
                if (document.getElementById('edit_title' + id)) {       // 如果項目仍在修改中狀態，要重新轉為文字模式，並把input框移除
                    $('#title' + id).css('display', 'inline');
                    $('#content' + id).css('display', 'inline');
                    $('#edit_title' + id).remove();
                    $('#edit_content' + id).remove();
                }
            } else {
                title.className = "title";
                content.className = "content";
                $('#edit' + id).css("display", "inline");               // 回到預設狀態(edit button長回來)
            }
        }
    });
}