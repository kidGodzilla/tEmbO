
  Tembo._.can('append',function(element,content){
    if (content)
    if (Array.isArray(content)){
      content.forEach(function(child){
        Tembo.appendChild(element,child);
      });
    }else{
      Tembo.appendChild(element,content);
    }

    return element;

  });



  Tembo._.can('appendChild',function(element,content){
    content.parent = element;
    if (element.getAttribute('data-tamboId') === null){
        element.setAttribute('data-tamboId','$0');
    }
    if (element.childIndex === undefined){
      element.childIndex = 0;
    }else{
      element.childIndex = element.childIndex+1;
    }

    if (content){

      if (content.render){
        component = content;
        content = Tembo.renderTree(content);
        content.parent = element;
        content.setAttribute('data-tamboId',content.parent.getAttribute('data-tamboId')+'.$'+content.parent.childIndex);
        element.appendChild(content);
        return element;
      }

      if (content.tagName){
        content.setAttribute('data-tamboId',content.parent.getAttribute('data-tamboId')+'.$'+content.parent.childIndex);
        element.appendChild(content);
        return element;
      }
      // if (content.instance){
      //   if (content.componentDidMount)
      //     content.componentDidMount();
      //   content.parent = element;
      //   element.appendChild(content.instance);
      //   return element;
      // }
      if (typeof content === 'string'){

        element.appendChild(document.createTextNode(content));
        return element;
      }
    }
  });




  Tembo._.can('setInitialState',function(element){
    if(element.isTemboComponent){
      if (element.getInitialState){
        if (!element.state)
          element.state = {};
        element.state = element.getInitialState();
      }
    }

    return element;
  });





// File : src/Tembo.createElement.js

(function(Tembo){

  'use strict';
  Tembo._.can('createElement',function(element,props,content){

    if (!props)
      props = {};

    if(arguments.length > 3){
      content = [];
      var index = 2;
      while(index < arguments.length){
        content.push(arguments[index]);
        index++;
      }
    }


    if (element.prototype)
    if (element.prototype.isTemboComponent){
      var Element = element;
      element = new Element();
      element.isTemboComponent = true;
    }

    return new Tembo.El(element,props,content);

  });
})(this.Tembo);
