var OImageDialog = {
	init : function(ed) {
		var dom = ed.dom, n = ed.selection.getNode(), f = document.forms[0], t = this;     
    tinyMCEPopup.resizeToInnerSize();
    
    if (t.selected(n)) {           
      var src = dom.getAttrib(n, 'src'), title = dom.getAttrib(n, 'title');    
      if (tinyMCEPopup.getParam('convert_urls'))
          src =  tinyMCE.activeEditor.convertURL(src, n, true);
      f.src.value = src;
      f.title.value = title;
    } 	
	},

  selected : function(n){
    return (n != null && n.nodeName.toLowerCase() == "img");
  },
  
	update : function(_new) {		
    var ed = tinyMCE.selectedInstance, t = this, n = ed.selection.getNode(), f = document.forms[0], h = '';
    var src = $F('src');        

   if (tinyMCEPopup.getParam("accessibility_warnings")) {
      var answer = true;
      if (!answer)
        return;
    }

    var cur_mode = $('img_src_type_file').checked ? "file" : "net"
    if (cur_mode == "file"){      
      $('spinner').show();
      f.submit(); 
      t.disableInputs(f);               
      return;
    }

    if (t.selected(n)) {
      t.setAttrib(n, 'src',  tinyMCE.activeEditor.convertURL(src, tinyMCE.imgElement));
      t.setAttrib(n, 'mce_src', src);
      t.setAttrib(n, 'title', $F('title'));
      if (_new) t.setAttrib(n, '_new', _new);
      t.setAttrib(n, 'alt', $F('title'));

      if (tinyMCE.isMSIE5)
        n.outerHTML = n.outerHTML;
    } else {
      h += "<img";
      h += t.makeAttrib('src', tinyMCE.activeEditor.convertURL(src, tinyMCE.imgElement), f);
      h += t.makeAttrib('mce_src', src, f);
      h += t.makeAttrib('title', $F('title'), f);
      h += t.makeAttrib('alt', $F('title'), f);
      if (_new) h += t.makeAttrib('_new', _new, f);
      h += " />";
      
      tinyMCEPopup.execCommand("mceInsertContent", false, h);
    }
    tinyMCEPopup.close();
	},  

  disableInputs : function (f){    
    f['disable']();
    f.disabled = true;
  },

  makeAttrib : function(attrib, value, f) {    
    var valueElm = f.elements[attrib];
    if (typeof(value) == "undefined" || value == null) {
      value = "";
      if (valueElm)
        value = valueElm.value;
    }
    if (value == "")
      return "";    
    value = value.replace(/&/g, '&amp;');
    value = value.replace(/\"/g, '&quot;');
    value = value.replace(/</g, '&lt;');
    value = value.replace(/>/g, '&gt;');
    return ' ' + attrib + '="' + value + '"';
  },

  checkSrcType : function (){
    var new_mode = $('img_src_type_net').checked ? "net" : "file";
    var cur_mode = $('src').style.display == 'none' ? "file" : "net"

    if(cur_mode!=new_mode){
      if(new_mode=="net"){
        $('srclabel').innerHTML="URL";
        $('src').style.display='';
        $('file').style.display='none';
      } else {
        $('srclabel').innerHTML="Файл";
        $('src').style.display='none';
        $('file').style.display='';
      }
    }
  },
  
  setAttrib : function(elm, attrib, value) {
    var formObj = document.forms[0];
    var valueElm = formObj.elements[attrib];

    if (typeof(value) == "undefined" || value == null) {
      value = "";
      if (valueElm)
        value = valueElm.value;
    }

    if (value != "") {
      elm.setAttribute(attrib, value);

      eval('elm.' + attrib + "=value;");
    } else
      elm.removeAttribute(attrib);
  }
};

tinyMCEPopup.requireLangPack();
tinyMCEPopup.onInit.add(OImageDialog.init, OImageDialog);