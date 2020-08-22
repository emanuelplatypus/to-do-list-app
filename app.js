const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = ["Buy Food","Cook Food","Eat Food"] ;
let workItems = [] ;

app.set('view engine', 'ejs');//positioning like this is important
//for view engines, creating a views folder is important
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/",function(req,res){
let day = date.getDate();
/* var currentDay = today.getDay();
var day = "" ;

switch (currentDay) {
  case 0:
  day = "Sunday";
    break;
    case 1:
    day = "Monday";
      break;
      case 2:
      day = "Tuesday";
        break;
        case 3:
        day = "Wednesday";
          break;
          case 4:
          day = "Thursday";
            break;
            case 5:
            day = "Friday";
              break;
              case 6:
              day = "Saturday";
                break;
  default:
  console.log("Error! Current day is equal to : "+ currentDay);

} */
/*if(currentDay===6 || currentDay===0)
{
  day = "Weekend" ;
  //res.send("Yay! It's a weekend");
  //res.sendFile(__dirname+"/index.html");
}
else{
  day = "Weekday";
  res.sendFile(__dirname+"/index.html");
}*/
  res.render("list",{listTitle: day, newListItems: items}); //key value object pair
});

app.post("/",function(req,res){

  let item = req.body.newItem ;

  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }
else{
  items.push(item);
  res.redirect("/");
}

  //console.log(item);

});

app.get("/work",function(req,res){
  res.render("list",{listTitle: "Work List", newListItems:workItems});
});

app.post("/work",function(req,res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about",function(req,res){
  res.render("about");
});


app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
