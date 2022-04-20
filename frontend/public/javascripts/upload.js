function upload_frontend() {
  let input_upload = document.getElementById('input_upload');
  if(!/.(gif|jpg|jpeg|png|GIF|JPG|JPEG|PNG)$/.test(input_upload.value)) {
    alert("檔案格式不符合，請上傳圖片檔案");
    return;
  }
  
  let formData = new FormData();
  console.log(input_upload.files[0]);
  formData.append('file', input_upload.files[0]);
  
  let url = "/upload/myFile";
  
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
  
function readURL(input) {
  if(input.files && input.files[0]) {
    let fileReader = new FileReader();
    fileReader.onload = function(e) {
      $('#upload_img').attr('src', e.target.result);
    }
  
    fileReader.readAsDataURL(input.files[0]);
  }
}