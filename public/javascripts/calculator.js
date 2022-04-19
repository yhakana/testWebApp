$('#sum').click(function() {
    let n1 = $('#num1').val();
    let n2 = $('#num2').val();
    // let api_post = 'http://localhost:3003/my/sum';
    let api_get = 'http://localhost:3003/my/sum?num1=' + n1 + '&num2=' + n2;

    // $.post(api_post, { num1: n1, num2: n2 }, function(res) { alert(res.mySum); });
    $.get(api_get, function(res) {
        alert(res.mySum);
    });
});