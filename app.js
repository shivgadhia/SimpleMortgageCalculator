(function($){

 var Calculation = Backbone.Model.extend({});
 
  var CalcView = Backbone.View.extend({
    el: $("#calc-form"),
   
    events: {
      "click #calc": "calculate"
    },
   
    initialize: function(){
      var self = this;
   
      this.amount = $("#amount");
      this.years = $("#years");
      this.rate = $("#rate");

      this.answerRepayment = $("#answer-repayment");
      this.answerIntOnly = $("#answer-int-only");

      this.amount.change(function(e){
        self.model.set({amount: $(e.currentTarget).val()});
      });
   
      this.years.change(function(e){
        self.model.set({years: $(e.currentTarget).val()});
      });

      this.rate.change(function(e){
        self.model.set({rate: $(e.currentTarget).val()});
      });
    },
   
    calculate: function(){
      var amountVal= this.model.get('amount');
      var yearsVal = this.model.get('years');
      var rateVal = this.model.get('rate');

      var rate = rateVal / 100;
      var repayment = ((amountVal * rate)/12) * (1/(1-(Math.pow(1/(1+rate), yearsVal))));
      var interestOnly = (amountVal * rate)/12;


      this.answerRepayment.text('£' + parseFloat(repayment, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
      this.answerIntOnly.text('£' + parseFloat(interestOnly, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
    }

  });



  new CalcView({model: new Calculation()});

})(jQuery);

