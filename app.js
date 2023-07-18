// ------------Дэлгэцтэй ажиллах контроллер------------

var uiController = (function() 
{
  var DOMstrings = 
  {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn:".add__btn"
  }

  return {
    getInput: function()
    {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDOMstrings: function()
    {
      return DOMstrings;
    },

    addListItem: function(item, type)
    {
      //Орлого зарлагын элементийг агуулсан HTML бэлтгэнэ
      var html, list;
      if(type === 'inc')
      {
        list = ".income__list"
        html = '<div class="item clearfix" id="income-%ID%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } 
      else 
      {
        list = ".expenses__list"
        html = '<div class="item clearfix" id="expense-%ID%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //HTML доторх орлого зарлагын утгуудыг өөрчлөнө
      html = html.replace('%ID%', item.id);
      html = html.replace('%DESCRIPTION%', item.description);
      html = html.replace('%VALUE%', item.value);

      //Бэлтгэсэн HTML ээ DOM-руу хийнэ
      document.querySelector(list).insertAdjacentHTML("beforeend", html);

    }
  };
})(); 

//--------------------Санхүүтэй ажиллах контроллер----------------------

var financeController = (function() 
{
  var Income = function(id, description, value)
  {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Expense = function(id, description, value)
  {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    items:  {
              inc: [],
              exp: []
            },

    totals: {
              inc: 0,
              exp: 0
            }
  };

  return {
    addItem: function(type, desc, val)
    {
      var item, id;

      if(data.items[type].length === 0){
        id = 1;
      }
      else{
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if(type === "inc"){
        item = new Income(id, desc, val);
      }
      else{
        item = new Expense(id, desc, val);
      }

      data.items[type].push(item);

      return item;
    },

    seeData: function()
    {
      return data;
    }
  };
})();

//-----------------------Холбогч контроллер-----------------------

var appController = (function(uiController, financeController)
{
  var ctrlAddItem = function()
  {
    // 1. Get input data
    var input = uiController.getInput();
    
    // 2. Send and save data to financeController
    var item = financeController.addItem(input.type, input.description, input.value);
    
    // 3. Show data on page(income & expense)
    uiController.addListItem(item, input.type);

    // 4. 

    // 5. 


  };

  var setupEventListeners = function()
  {
    var DOM = uiController.getDOMstrings();
    
    document.querySelector(DOM.addBtn).addEventListener("click", function()
    {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function(event){
    if(event.key === 13)
      {
       ctrlAddItem();
      }
    });
  };

  return {
    init: function()
    {
      console.log("Application started...");
      setupEventListeners();
     }
  }

})(uiController, financeController);

appController.init();