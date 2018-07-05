function readAsText(e) {
    var file = document.getElementById("file").files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (f) {
        var result = document.getElementById("main_content");
        result.innerText = this.result;
    }
}
document.getElementById("rangeBtn").onchange = function(){

    window.scrollTo(0,this.value*200);
    console.log(JETBOOK.elements.rate*this.value)
    console.log(this.value)
    console.log(JETBOOK.elements.rate)
}


