var count = [];
for (var i = 0; i< 1000; i ++) {
    var r = Math.ceil((Math.random() * 3))-1;
    count[r]= count[r]? (count[r] + 1) : 1;
}

for (var j = 0; j <count.length; j++) {
    console.log(j + " = "  + count[j]);
}