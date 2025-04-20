layui.use(['form', 'util', 'laytpl'], function () {
    var form = layui.form;
    var layer = layui.layer;
    var util = layui.util;
    var laytpl = layui.laytpl;

    let checkForm = function (data) {
        var field = data.field, form = data.form, actionUri = form.getAttribute('action');
        var qResult = $(form).attr('data-foreign'), popupTitle = $(form).find('h3').text(),
            foreignId = qResult.replace('#', '') + '-layer';

        var clearInput = function () {
            $(form).find('input[name="sn"]').val('');
            $(form).find('input[name="name"]').val('').trigger('focus');
        };

        var loadIndex = layer.load(2);
        $.post(actionUri, field, function (res) {
            layer.close(loadIndex);
            if (res.msg !== '') {
                layer.msg(res.msg);
            }
            if (res.code !== undefined && res.code === 0) {
                clearInput();
            }
            if (res.data !== undefined && res.code !== undefined && res.code === 1) {
                clearInput();
                var compile = laytpl($(qResult).html());
                compile.render(res.data, function (html) {
                    layer.open({
                        title: popupTitle
                        , id: foreignId
                        , maxWidth: 640
                        , resize: true
                        , type: 1
                        , content: html
                        , btn: ['退出']
                    }, function (index, layero) {
                        layer.close(index);
                    });
                });
            }
        });
    }

    form.on('submit(queryForm1)', function (data) {
        checkForm(data);
        return false;
    });

    form.on('submit(queryForm2)', function (data) {
        checkForm(data);
        return false;
    });

    form.on('submit(queryForm3)', function (data) {
        checkForm(data);
        return false;

    });

});