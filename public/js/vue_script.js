"use strict";
var socket = io();

var vm = new Vue({
   el: '#Menu',
   data: {
     items: food,
     selectedburgers: [],
     select: "",
     orders: {},
   },
   created: function () {
     socket.on('initialize', function (data) {
       this.orders = data.orders;
     }.bind(this));

     socket.on('currentQueue', function (data) {
       this.orders = data.orders;
     }.bind(this));
   },
   methods: {
     getNext: function () {
       var lastOrder = Object.keys(this.orders).reduce( function (last, next) {
         return Math.max(last, next);
       }, 0);
       return lastOrder + 1;
     },
     addOrder: function (event) {
       socket.emit("addOrder", { orderId: this.getNext(),
                                 details: { x: event.clientX-10 - event.currentTarget.getBoundingClientRect().left,
                                            y: event.clientY-10 - event.currentTarget.getBoundingClientRect().top},
                                 orderItems: this.selectedburgers
                               });
     }
   }
 });



/*function MenuItem(name,kcal,price,gluten,lactose,url){
this.name = name;
this.kcal = kcal;
this.price = price;
this.gluten = gluten;
this.lactose = lactose;
this.img = url;
}

var Burger1 = new MenuItem("Hamburger",650,20,false,false,"http://www.max.se/ImageVaultFiles/id_702/cf_22/Burgers-Beefburger.jpg");
var Burger2 = new MenuItem("Cheeseburger",700,25,false,true,"http://www.max.se/ImageVaultFiles/id_703/cf_22/Burgers-Cheeseburger.jpg");
var Burger3 = new MenuItem("Chickenburger",500,30,true,false,"http://www.max.se/ImageVaultFiles/id_1072/cf_22/Delifresh_Kycklingburgare.jpg");
var Burger4 = new MenuItem("Bigburger",1300,55,true,true,"https://www.max.se/ImageVaultFiles/id_714/cf_14/Burgers-Frisco.jpg");
var Burger5 = new MenuItem("Veggieburger",900,35,false,false,"https://www.max.se/ImageVaultFiles/id_3390/cf_22/Burgers-Crispy-No-Chicken-Sriracha.jpg");



var Burgers = [Burger1,Burger2,Burger3,Burger4,Burger5];

var vm = new Vue({
  el: "#Menu",
  data: {
    items: Burgers,
    selectedburgers: []
  }
});

var vm2 = new Vue({
  el: "#Button",
  methods: {
      say: function(message) {
        var ordername = document.getElementById("name").value;
        var orderemail = document.getElementById("email").value;
        var orderstreet = document.getElementById("Street").value;
        var orderhouse = document.getElementById("House").value;
        var orderpayment = document.getElementById("payment").value;
        var ordergender = document.getElementById("Gender").value;
        console.log(ordername,orderemail,orderstreet,orderhouse,orderpayment,ordergender)
      }
  }
})*/
