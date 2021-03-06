(function() {	
  tinymce.PluginManager.requireLangPack('oimage');

  tinymce.create('tinymce.plugins.OImagePlugin', {		
    init : function(ed, url) {
      ed.addCommand('mceOImage', function() {
        ed.windowManager.open({
          file : url + '/image.htm',
          width : 360 + parseInt(ed.getLang('oimage.delta_width', 0)),
          height : 140 + parseInt(ed.getLang('oimage.delta_height', 0)),
          inline : 1,
          resizable : "no"
        }, {plugin_url : url});
      });
      
      ed.addButton('oimage', {
        title : 'Вставить изображение',
        cmd : 'mceOImage',
        image : url + '/img/sample.gif'
      });

      ed.onNodeChange.add(function(ed, cm, n) {
        if (n == null)
          return;                  
        if (n.nodeName.toLowerCase() == "img" && n.className.indexOf('mceItem') == -1) {
          cm.setActive('oimage', true);             
          return true;
        }
        cm.setActive('oimage', false);      
      });
    },     
    getInfo : function() {
      return {
        longname : 'OImage plugin',
        author : 'Ivan Garmatenko',
        authorurl : 'http://github.com/cheef',				
        version : "1.0"
      };
    }  
  });  

  tinymce.PluginManager.add('oimage', tinymce.plugins.OImagePlugin);
})();