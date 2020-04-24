const express = require('express');
const app = express();
const path = require('path');
const bodyParser=require('body-parser');
const nodemailer=require('nodemailer');
var userDetails={};
var allowing={};
var order={};
const rates=[45,95,95,360,340,330,4750,250,35];
var productrates={};
var total={};
var check={};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,'public')));


app.get("/testing",(req,res)=>{
  res.render('testing');
});

app.get("/",(req,res)=> {
    res.render('index');
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/signin",(req,res)=>{
    res.render('signin');
});

// app.get("/success",(req,res)=>{
//     res.render('success');
// });

// app.post("/add",(req,res)=>{
//     userDetails={
//         name:req.body.first_name,
//         email:req.body.email
//     }
//     console.log(userDetails);
//     res.render('add',{userDetails});
//     userDetails={};
//  });

 app.post("/success",(req,res)=>{
         allowing={
             name:req.body.first_name,
             email:req.body.email
         };
         console.log(allowing.name);
         res.render('success',{allowing});
 });

 app.post("/shopping",(req,res)=>{
     check={
         name:req.body.first_name,
         email:req.body.email
     };
     console.log(check);
     res.render("shopping");
 });

 app.post("/placeorder",(req,res)=>{
    order={

        sand:parseInt(req.body.sand),
        stone:parseInt(req.body.stone),
        bajarpur:parseInt(req.body.bajarpur),
        ultratech:parseInt(req.body.ultratech),
        bigcem:parseInt(req.body.bigcem),
        jksuper:parseInt(req.body.jk),
        brick:parseInt(req.body.brick),
        chemical:parseInt(req.body.chemical),
        soil:parseInt(req.body.soil)
    };
    res.render("placeorder");
    console.log(order);
 });
 
 




 app.post("/review",(req,res)=>{
     userDetails={
         name:req.body.username,
         contact:req.body.contact,
         address:req.body.address,
         nearby:req.body.nearby,
         email:req.body.email
     }

        console.log(typeof(order.sand));

        var sandrate=(order.sand*45);
        var stonerate=(order.stone*95);
        var bajarpurrate=(order.stone*95);
        var ultratechrate=(order.ultratech*360);
        var bigcemrate=(order.bigcem*340);
        var jksuperrate=(order.jksuper*330);
        var brickrate=(order.brick*4750);
        var chemicalrate=(order.chemical*250);
        var soilrate=(order.soil*35);


        productrates={
            sand:parseInt(sandrate),
            stone:parseInt(stonerate),
            bajarpur:parseInt(bajarpurrate),
            ultratech:parseInt(ultratechrate),
            bigcem:parseInt(bigcemrate),
            jksuper:parseInt(jksuperrate),
            brick:parseInt(brickrate),
            chemical:parseInt(chemicalrate),
            soil:parseInt(soilrate)
        };
        
        var sum=0;
        for( var el in productrates ) {
            if( productrates.hasOwnProperty( el ) ) {
              sum += parseFloat( productrates[el] );
            }
          }

        total={final:sum};  
     
     res.render("review",{userDetails,productrates,total});
     console.log(productrates);
     console.log(userDetails);
 });


    app.post("/ordersuccess",(req,res)=>{
        
        var name=userDetails.name;
        var contact=userDetails.contact;
        var address=userDetails.address;
        var email=userDetails.email;
        var nearby=userDetails.nearby;
        var sender='tushar.mittal6397@gmail.com';

        var sandr=productrates.sand;
        var stoner=productrates.stone;
        var bajarpurr=productrates.bajarpur;
        var ultratechr=productrates.ultratech;
        var bigcemr=productrates.bigcem;
        var jksuperr=productrates.jksuper;
        var brickr=productrates.brick;
        var chemicalr=productrates.chemical;
        var soilr=productrates.soil;
        var totalr=total.final;

        const output=`
        
        <div id="mailbody">
        <h1 style="margin-left: 30px">Your Orders/-</h1><br/><br/>
        <label class="moving">Name:<span><h6>${name}</h6></span></label><br/>
        <label class="moving">Contact:<span><h6>${contact}</h6></span></label><br/>
        <label class="moving">Address:<span><h6>${address}</h6></span></label><br/>
        <label class="moving">Nearby:<span><h6>${nearby}</h6></span></label><br/>
        <label class="moving">Email:<span><h6>${email}</h6></span></label><br/><br/>
        <table class="table table-bordered moving">
            <thead>
              <tr>
                <th>Item</th>
                <th>prince</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sand</td>
                <td>${sandr}</td>
              </tr>
              <tr>
                <td>Stone</td>
                <td>${stoner}</td>
              </tr>
              <tr>
                <td>Bajarpur</td>
                <td>${bajarpurr}</td>
              </tr>
              <tr>
                <td>Ultratech</td>
                <td>${ultratechr}</td>
              </tr>
              <tr>
                <td>BigCem</td>
                <td>${bigcemr}</td>
              </tr>
              <tr>
                <td>JkSuper</td>
                <td>${jksuperr}</td>
              </tr>
              <tr>
                <td>Brick</td>
                <td>${brickr}</td>
              </tr>
              <tr>
                <td>Chemical</td>
                <td>${chemicalr}</td>
              </tr>
              <tr>
                <td>Soil</td>
                <td>${soilr}</td>
              </tr>
              <tr>
                <td><h1>Total</h1></td>
                <td>${totalr}</td>
              </tr>
            </tbody>
          </table>
        </div> `
        
        let transporter=nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            auth:{
                user:'tushar.mittal6397@gmail.com',
                pass:'Tushar@88812'
            },
            tls:{
                rejectUnauthorized:false
            }
        });


        let mailOption={
            from:' "Shri Balaji Building Material"<tushar.mittal6397@gmail.com>  ',
            to:`${email},${sender}`,
            subject:'Order Confermation ',
            text:'order confermed',
            html:output
        };

        transporter.sendMail(mailOption,(error,info)=>{
            if(error){
                return console.log(error)
            }

            console.log("Message sent:%s",info.messageId);
            console.log("Preview Url:%s",nodemailer.getTestMessageUrl(info));
        });



        res.render("ordersuccess",{msg:'Email has been sent'});



    });
 
// app.get("/add",(req,res)=>{
//     res.render('add',{userDetails});
// });


app.listen(3000,console.log("server is running"));