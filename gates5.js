      var Circ1 = function(x,y,r,state,id){
               this.x = x;
               this.y =y;
               this.r = r;
               this.fill = "red";
               this.id = id;
               this.out_state = 0;
               this.state = state;
               this.inputs = [];
               this.outputs = [];
               this.body ="" ;



               this.connect = function(gate, gate_put){   //tells one gate to listen to the output of another
                   gate_put.push(gate);
                   this.bod();
                };

               this.disconnect = function(gate, gate_put){
                   gate_put.splice(gate_put.indexOf(gate), 1);

                   this.bod();
               };

              this.recieve = function (state) {               //This method sets the gates state (0 or 1)
                   this.state = state;
                   this.bod();
                   this.transmit(state);
               };

               this.transmit= function(state){                //this method takes the state of the gate and sends it to any gate in its "outputs" array by calling that gate's "receive" method
                   for (var i=0; i<this.outputs.length;i++) {
                       this.outputs[i].recieve(state);        //
                       this.bod();
                   }
               };


               this.bod = function () {                       //this is the method that creates the body of the circle object.
                   if (this.state == 0){                      // this if statement sets fill to blue if the state property is "0"'
                       this.fill = "blue";
                       this.out_state = 0;
                   }

                   if (this.state==1){                       // this if statement sets the fill to red if the state property is 1
                       this.fill="red";
                       this.out_state = 1;
                   }

                   this.body = "<circle cx=\"" + this.x + "\" cy=\"" + this.y + "\" r=\"" + this.r + "\" fill=\"" +  this.fill + "\" id=\"" + this.id + "\" class=\"put\"     />";



                   control();
               };

               this.make = function(){
                   this.bod()
                   collection.push(this);
                   for (var i=0; i<collection.length;i++){
                       collection[i].transmit(collection[i].state);
                   }
                   control();


               };



           };                       // this is the prototypical object (not literally). It receives 1 and outs 1, in 0 out 0. 0 = blue, 1 = red.

       var Not  = function(x,y,r,state,id){
               this.x = x;
               this.y =y;
               this.r = r;
               this.fill = "red";
               this.id = id;
               this.out_state = 0;
               this.state = state;
               this.inputs = [];
               this.outputs = [];
               this.body ="" ;



               this.connect = function(gate, gate_put){   //tells one gate to listen to the output of another
                   gate_put.push(gate);
                   this.bod();
                };

               this.disconnect = function(gate, gate_put){
                   gate_put.splice(gate_put.indexOf(gate), 1);

                   this.bod();
               };

               this.recieve = function (state) {
                   var temp  = state;
                   if(temp == 0){
                       this.state = 1;
                   }

                   if (temp == 1){
                       this.state = 0;
                   }
                   this.bod();

                   this.transmit(this.state);
               };

               this.transmit= function(state){
                   for (var i=0; i<this.outputs.length;i++) {
                       this.outputs[i].recieve(state);
                       this.bod();
                   }
               };


               this.bod = function () {                       //this is the method that creates the body of the circle object.
                   if (this.state == 0){                      // this if statement sets fill to blue if the state property is "0"'
                       this.fill = "blue";
                       this.out_state = 0;
                   }

                   if (this.state==2){                       // this if statement sets the fill to red if the state property is 1
                       this.fill="green";
                       this.out_state = 2;
                   }

                   if (this.state==1){                       // this if statement sets the fill to red if the state property is 1
                       this.fill="red";
                       this.out_state = 1;
                   }


                   this.body = "<circle cx=\"" + this.x + "\" cy=\"" + this.y + "\" r=\"" + this.r + "\" fill=\"" +  this.fill + "\" id=\"" + this.id + "\" class=\"put\" >NOT</circle>";
                   control();
               };

               this.make = function(){
                   this.bod()
                   collection.push(this);
                   for (var i=0; i<collection.length;i++){
                       collection[i].transmit(collection[i].state);
                   }

                   control();
               };



           };                       // this is the object constructor for the NOT gate. In 0, out 1. In 1, out 0. 1 = red, 0 = blue.

        var And = function(x,y,r,state,id){                              // This is the object constructor for the AND gate. i
            this.x = x;
            this.y =y;
            this.r = r;
            this.fill = "red";
            this.id = id;
            this.instate1 ;
            this.instate2  ;
            this.out_state = 0;
            this.state = state;
            this.inputs = [];
            this.outputs = [];
            this.body ="" ;
            this.inputA = [];
            this.inputB= [];

            this.connect = function(gate, gate_put){   //tells one gate to listen to the output of another args are the gate, and input or ouput
                gate_put.push(gate);
                this.bod();
            };

            this.disconnect = function(gate, gate_put){
                gate_put.splice(gate_put.indexOf(gate), 1);
                this.bod();
            };

            this.recieve = function (state) {

                if (!this.instate1  && !this.instate2){
                        this.instate1 = state;
                    }
                else if (this.instate1 && !this.instate2){
                    this.instate2 = state;
                }

              else {

                   if(state == 0){
                       if(this.instate1 ==0 && this.instate2 ==1){
                           this.instate2 = 0;
                       }
                    else if(this.instate1 ==1 && this.instate2 ==0){
                        this.instate1 =0;
                    }

                    else {
                        this.instate1 = 0;
                    }
                   }

                   if (state ==1){
                       if(this.instate1 == 0 && this.instate2 == 1){
                           this.instate1 = 1;
                       }
                       else if (this.instate1 == 1 && this.instate2 == 0){
                           this.instate2 = 1;
                       }

               }
}

                 this.bod();
                 var t_state = this.state;
                 this.transmit(t_state);
            };



            this.transmit= function(state){
                for (var i=0; i<this.outputs.length;i++) {
                    this.outputs[i].recieve(state);
                    this.bod();
                }
            };


            this.bod = function () {                       //this is the method that creates the body of the circle object.
                if (this.instate1 ==1 && this.instate2 ==1){
                this.state =1;
                }

                else {
                this.state =0;
                }
                if (this.state == 0){                      // this if statement sets fill to blue if the state property is "0"
                    this.fill = "blue";
                    this.out_state = 0;
                }
                if (this.state==1){                       // this if statement sets the fill to red if the state property is 1
                    this.fill="red";
                    this.out_state = 1;
                 }

                 this.body = "<circle cx=\"" + this.x + "\" cy=\"" + this.y + "\" r=\"" + this.r + "\" fill=\"" +  this.fill + "\" id=\"" + this.id + "\" class=\"put\">AND</circle>";

                 control();



            };

            this.make = function(){
                    this.bod()
                    collection.push(this);
                    for (var i=0; i<collection.length;i++){
                       collection[i].transmit(collection[i].state);
                   }
                    control();
                 };
};

         var Or = function(x,y,r,state,id){                              // This is the object constructor for the AND gate. i
            this.x = x;
            this.y =y;
            this.r = r;
            this.fill = "red";
            this.id = id;
            this.instate1 ;
            this.instate2  ;
            this.out_state = 0;
            this.state = state;
            this.inputs = [];
            this.outputs = [];
            this.body ="" ;

            this.connect = function(gate, gate_put){   //tells one gate to listen to the output of another
                gate_put.push(gate);
                this.bod();
            };

            this.disconnect = function(gate, gate_put){
                gate_put.splice(gate_put.indexOf(gate), 1);
                this.bod();
            };

            this.recieve = function (state) {

                if (!this.instate1  && !this.instate2){       // handles the connecting of the inputs. If there are neither inputs filled, new input goes into instate1
                        this.instate1 = state;
                    }
                else if (this.instate1 && !this.instate2){    // if there is one value input already, incoming value goes into instat2
                    this.instate2 = state;
                }
              else{

                   if(state == 0){
                       if(this.instate1 ==0 && this.instate2 ==1){  //This  makes sure that an incoming 0 affects the value that's 1, not just re-setting the already zero value to zero again and not changing the state of the gate
                           this.instate2 = 0;
                       }
                    else if(this.instate1 ==1 && this.instate2 ==0){
                        this.instate1 =0;
                    }

                    else {
                        this.instate1 =0;   // if both are set to one, or neither are, then the incoming 0 loads into instate1
                    }
                   }

                   if (state ==1){
                       if(this.instate1 ==0 && this.instate2 ==1){ // this does the same as the above for incoming 1's. If there's one of the values that's 0 and one that's 1, this makes sure that the incoming 1 affects the 0 and not the 1.
                           this.instate1 =1;
                       }
                       else if (this.instate1 ==1 && this.instate2 ==0){
                           this.instate2 = 1;
                       }

               }
}

                 this.bod();
                 var sts = this.state;
                 this.transmit(sts);
            };


            this.transmit= function(state){
                for (var i=0; i<this.outputs.length;i++) {
                    this.outputs[i].recieve(state);
                    this.bod();
                }
            };


            this.bod = function () {
                if (this.instate1 ==1 || this.instate2 ==1){
                this.state =1;
                }

                else {
                this.state =0;
                }
                if (this.state == 0){                      // this if statement sets fill to blue if the state property is "0"
                    this.fill = "blue";
                    this.out_state = 0;
                }
                if (this.state==1){                       // this if statement sets the fill to red if the state property is 1
                    this.fill="red";
                    this.out_state = 1;
                 }

                 this.body = "<circle cx=\"" + this.x + "\" cy=\"" + this.y + "\" r=\"" + this.r + "\" fill=\"" +  this.fill + "\" id=\"" + this.id + "\" class = \"put\">AND</circle>";

                 control();


               //control(this); /// instead of pushing the gate to the collection[], somehow alert the control that it needs to cycle through the objects and replace each body with the new body.
            };

            this.make = function(){
                    this.bod()
                     collection.push(this);
                     for (var i=0; i<collection.length;i++){
                       collection[i].transmit(collection[i].state);
                   }
                    control();
                 };
        };

            function Con(x1, y1, x2,y2, state, id){
               this.x1 = x1;
               this.y1 = y1;
               this.x2 = x2;
               this.y2 = y2;
               this.fill = "blue";
               this.state = 0;
               this.instate = 0;
               this.body = "";
               this.inputs = [];
               this.outputs = [];
               this.id = id;


            this.connect = function(gate, gate_put){   //tells one gate to listen to the output of another
                    gate_put.push(gate);
                    this.bod();
                };

            this.disconnect = function(gate, gate_put){
                gate_put.splice(gate_put.indexOf(gate), 1);
                this.bod();
            };

            this.recieve = function (state) {
                 this.state = state;
                 this.bod();
                 this.transmit(state);
            };

            this.transmit= function(state){
                for (var i=0; i<this.outputs.length;i++) {
                    this.outputs[i].recieve(state);
                    this.bod();
                }
            };

            this.make = function(){
                   this.bod()
                   collection.push(this);
                   for (var i=0; i<collection.length;i++){
                       collection[i].transmit(collection[i].state);
                   }

                   control();
               };

            this.bod = function(){
                   if (this.state ==0){
                       this.fill = "blue";

                   }

                   if (this.state ==1){
                      this.fill = "red";
                   }

                   this.body = "<line x1 = \"" + this.x1 + "\" y1 = \"" + this.y1 + "\" x2 = \"" + this.x2 + "\" y2 = \"" + this.y2 + "\" style=\"stroke-width: 2px; stroke: " + this.fill + "\"/>";

                   control();

               };

           }