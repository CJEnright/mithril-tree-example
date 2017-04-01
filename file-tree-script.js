// Structure (idea? base?) taken from https://vuejs.org/v2/examples/tree-view.html
var items = [
  {
    name:"hello"
  },
  {
    name:"wat"
  },
  {
    name:"child folder",
    children: [
      {
        name:"hello"
      },
      {
        name:"wat"
      }
    ]
  }
];

var Item = {
  view: function(item) {
    console.log()
    if(item.attrs.children) { // Then it is a folder
      if(item.attrs.isOpen) {
        return m("li", [
          m("div", {onclick: function() {Item.click(item);}}, item.attrs.name + " [-]"),
          m("ul", 
            item.attrs.children.map(function(item) {
              return m(Item, item);
            }),
            m("li", [
              m("span", {onclick: function() {item.attrs.children.push({name: "new stuff"});}}, "+")
            ])
          )
        ]);
      }
      else {
        return m("li", [
          m("div", {onclick: function() {Item.click(item);}}, item.attrs.name + " [+]")
        ]);
      } 
    }
    else {
      return m("li", [
        m("div", {
          onclick: function() {Item.click(item);},
          ondblclick: function() {
            item.attrs.children = [
              {
                name:"hello"
              },
              {
                name:"wat"
              }
            ]
            item.attrs.isOpen = true;
          }
        }, item.attrs.name)
      ]);
    }
  },
  click: function(item) {
    if(item.attrs.children) { // Then it is a folder
      item.attrs.isOpen = !item.attrs.isOpen;
    }
    else { // Then it is a item
      // Called when a document is clicked on
    }
  }
}

var fileTreeRoot = document.getElementById('treeRoot')

m.mount(fileTreeRoot, {view: function() {
  return items.map(function(item) {
    return m(Item, item);
  });
}});