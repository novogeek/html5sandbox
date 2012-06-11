$(document).ready(function () {
    var lblSandbox = $('#lblSandboxOptions');
    if ("sandbox" in document.createElement("iframe")) {
        lblSandbox.html("HTML5 Sandbox is supported!");
    }
    else {
        lblSandbox.html("HTML5 Sandbox is NOT supported!");
        return;
    }

    var chkSandboxOptions = $('#divCheckboxes :checkbox');
    var rdSandbox = $('input[name="rdSandbox"]');
    var radioSelected = $(rdSandbox + ':checked').val();
//    var iframeSrc = "http://localhost/genuine/default.aspx"; //ClickJacking
    var iframeSrc = "xss.html";    //DOM Xss-same domain

    var divFrameContainer = $('#divIframeContainer');

    (radioSelected == 0) ? normalFrame() : sandboxedFrame();

    function normalFrame() {
        divFrameContainer.empty();
        lblSandbox.text('<iframe src="' + iframeSrc + '">');
        chkSandboxOptions.attr('disabled', 'disabled');
        $('<iframe>', { src: iframeSrc }).appendTo(divFrameContainer);
    }
    function sandboxedFrame() {
        chkSandboxOptions.removeAttr('disabled');
        chkSandboxOptions.change(buildFrame);

        function buildFrame() {
            var sandboxOptions = '';
            divFrameContainer.empty();

            $('#divCheckboxes :checked').each(function () {
                sandboxOptions += $(this).val() + ' ';
                console.log('sandboxOptions: ', sandboxOptions);
            });

            lblSandbox.text('<iframe sandbox="' + sandboxOptions + '" src="' + iframeSrc + '">');

            $('<iframe>', {
                src: iframeSrc,
                sandbox: sandboxOptions
            }).appendTo(divFrameContainer);
        }
        buildFrame();
    }

    rdSandbox.change(function () {
        radioSelected = $(this).val();
        (radioSelected == 0) ? normalFrame() : sandboxedFrame();
    });
});