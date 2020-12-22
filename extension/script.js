chrome.cookies.getAll({}, function (cookies) {
    for (let cookie of cookies) {
        if(cookie.name == "rack.session")
            document.getElementById("cookie").value=cookie.value;
    }
});