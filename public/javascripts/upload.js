function upload_frontend() {
    let input_upload = document.getElementById('input_upload');
  
    // 透過FormData將表單資料轉換成可透過AJAX傳送到後端的資料形式
    // ps. FormData: K-V組成的物件，可以儲存表單元素的name、value屬性的值，主要用於儲存並上傳二進制的檔案
    let formData = new formData();
    formData.append('file123', input_upload.files[0]);
  
    let url = "/api/testUpload?user_ID=101886";
  
    // multer只能上傳base64編碼的檔案，在此不使用$.post，而是用$.ajax以達到更精確的設置
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      processData: false,   // false表傳輸時資料不進行自動轉換 ($.ajax預設會將傳輸資料轉為查詢字串)
      contentType: false,   // multer已設定好資料型態，在此避免ajax過程中又更動了資料型態
      success: function(res) {
        if(res.status == 1) {
          alert("Upload Successfully!");
          history.go(0);
        }
      },
      error: function(err) {
        console.log("upload failed: " + err);
      }
    });
  }
  
  $('#input_upload').change(function() {
    readURL(this);
  });
  
  // type為file的input元素可呼叫FileList(input.files)，其中儲存了<input>所選取的檔案
  function readURL(input) {
    if(input.files && input.files[0]) {
      // HTML5用FileReader來讀取檔案資料
      let fileReader = new FileReader();
      // FileReader onload時將預覽圖img元素的src改為新的路徑(e.target.result)
      fileReader.onload = function(e) {
        $('#upload_img').attr('src', e.target.result);
      }
  
      // readAsDataURL()讀取傳入的檔案，並回傳該檔案轉成base64的字串，同時觸發onload()
      fileReader.readAsDataURL(input.files[0]);
    }
  }