/*
 * htmlson.js 0.2 (Adalen VLADI) | MIT 
 * Github: https://github.com/adalenv/htmlson
 */

(function($) {

  $.fn.htmlson = function(data, options,debug) {

    //---debug---//
  	if (debug=='debug') {
  		log=function(l){
  			console.log(l);
  		}
  	} else {
  		log=function(log){
  		};
  	}
    log('debug: true');
    //---/debug---//
  	
    //---parse object---//
	  var obj = data;
    if (typeof obj === "string") {

    	obj = $.parseJSON(obj);

    }
    log('object: '+JSON.stringify(obj));
    log('object depth: '+getDepth(obj))
    var keys =Object.keys(obj[0]);
    log('auto headers: '+JSON.stringify(keys));
    //---/parse object---//

    //---initialize---//
  	log('headers set: '+JSON.stringify(options));
    this.addClass('htmlson-active');
    var thead=`<thead>`;
    //---/initialize---//

    //---/set headers---//
    for (var i = 0; i < keys.length; i++) {

      if(options[i]==undefined){

        thead+=`<th>${keys[i]}</th>`;//if auto

      } else{

        thead+=`<th>${options[i]}</th>`;//if user defined

      }

    }

    thead+=`</thead>`;

    log('table head: '+thead);
    //---/set headers---//

    //---set body---//
    tbody=`<tbody>`;

    for (let i in obj) {

    	tbody+=`<tr>`;

	    let array = $.map(obj[i], function(value, index) { return value; });

	    for (let i in array){

	    	if(!isObject(array[i])){//if not object

	    		tbody+=`<td>${array[i]}</td>`

	    	} else{//if object tonvert to ul
            tbody+=`<td><ul>`;
            let ob = $.map(array[i], function(value, index) { return value; });
            for (let i in ob) {
                tbody+=`<li>${ob[i]}</li>`;
            }
            tbody+=`</ul></td>`;

        }

	    }	

		tbody+=`</tr>`;

    }

    tbody+=`</tbody>`;

    log('table body: '+thead);
    //---/set body---//

    //---generate output--//
    this.html(thead+tbody);
    //---/generate output--//

  };

}(jQuery));

//---functions used--//
function isObject (value) {

	return value && typeof value === 'object' && value.constructor === Object;

};

getDepth = function (obj) {
    var depth = 0;
    if (obj.children) {
        obj.children.forEach(function (d) {
            var tmpDepth = getDepth(d)
            if (tmpDepth > depth) {
                depth = tmpDepth
            }
        })
    }
    return 1 + depth
}
//---/functions used--//