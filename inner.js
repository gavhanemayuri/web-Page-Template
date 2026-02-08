function validate()
{
    var name=document.getElementById('name').value;
    var mag=" enter the number";
    if(name.length>3)
    {
        msg="correct";
    }
    else{
        msg="poor";
    }
    document.getElementById('error').innerText=msg;
}