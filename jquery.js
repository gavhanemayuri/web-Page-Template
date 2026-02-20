// $(document).ready(()=>{
//     $("#hide").click(()=>{
//         $("p").hide()
//     });
//     $("#show").click(()=>{
//         $("p").show()
//     });
// });


// $(document).ready(()=>{
//     $( "#toggle").click(()=>{
//         $("p").toggle()
//     });
// });


// $(document).ready(()=>{

//     $("#p1").click(()=>{
//     $("#p2").slideToggle() 

//     });
// });


// $(document).ready(()=>{
//     $("button").click(()=>{
//         $("p").html("JQuery");
//     });
// });


// $(document).ready(()=>{
//     $("button").click(()=>{
//         $("ol").append("<li>new item </li>");
//     });
// });

$(document).ready(()=>{
    $("button").click(()=>{
        $("p").clone().appendTo("body");
    });
});