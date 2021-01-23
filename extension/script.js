chrome.cookies.getAll({}, function (cookies) {
    for (let cookie of cookies) {
        if(cookie.name == "rack.session")
            document.getElementById("cookie").value=cookie.value;
    }
    });

document.getElementById("host-ip").addEventListener("input",(e) => {
     let url = e.target.value.trim();
     document.getElementById("form").action = `http://${url}/api/post`;
})