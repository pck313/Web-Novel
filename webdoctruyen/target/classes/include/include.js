function copyFileContentToElement(filePath, elementSelector) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                // Chèn nội dung của file vào phần tử đích
                document.querySelector(elementSelector).innerHTML = this.responseText;
            } else if (this.status === 404) {
                document.querySelector(elementSelector).innerHTML = "File not found.";
            }
        }
    };
    xhttp.open("GET", filePath, true);
    xhttp.send();
}
