setInterval(function coloring_active() {
  var n=document.getElementById("myOl").childElementCount;
  var c = document.getElementById("myOl").children;
  document.getElementById("myOl").style.backgroundColor = "";
  for (i = 0; i < n; i++) {
        c[i].style.backgroundColor = "";
      }
      c[row_num].style.backgroundColor = "green"; //5294e2
},10);
