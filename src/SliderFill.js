Ext.define('Ext.plugin.SliderFill', {
    extend: 'Ext.util.Observable',
    alias: 'plugin.sliderfill',
    initialize: function() {
        this.callParent();
        console.log("initialize");
    },
    init: function(cmp) {
        console.log("init");
        console.log(cmp);
        var me = this,
            fillclass = ['x-slider-fill1','x-slider-fill2','x-slider-fill3','x-slider-fill4']
            sliderinner = Ext.get(Ext.DomQuery.select('.x-slider-inner',cmp.element.dom)[0]),
            thumbarr = cmp.getComponent().getThumbs();
	console.log(me);
	
       
	cmp.on('painted',function(slider){
	    me.onSliderPainted(slider);
	});

	cmp.on('change',function(slider,thumb){
	    console.log("change")
            //console.log(slider);
            console.log(thumb);
            var thumbarr = slider.getComponent().getThumbs();
            console.log(thumbarr.indexOf(thumb));
            //thumb.fireEvent('dragend',thumb);
           
	   Ext.defer(function(){
		me.thumbAdjust(slider,thumb,thumbarr.indexOf(thumb));
	    },200);
	});
        
    
	
	Ext.Viewport.on('orientationchange',function(){
	    Ext.defer(function(){
		me.onSliderPainted(cmp);
	    },100);
	});
	
    },
    onSliderPainted : function(slider){
        var me = this,
            thumbarr = slider.getComponent().getThumbs(),
            fillclass = ['x-slider-fill1','x-slider-fill2','x-slider-fill3','x-slider-fill4'],
            sliderinner = Ext.get(Ext.DomQuery.select('.x-slider-inner',slider.element.dom)[0]);
            Ext.each(thumbarr,function(item,i){
		console.log(item.translatableBehavior.translatable)
                var fill_space_id = "fill-"+item.id, width = item.translatableBehavior.translatable.x;
                Ext.DomHelper.append(sliderinner, {tag: 'div', id: fill_space_id, cls: 'x-slider-fill '+fillclass[i] });
                if(i > 0){
                    var prev_thumb =  slider.getComponent().getThumb(i-1),
                        prev_width =  prev_thumb.translatableBehavior.translatable.x,
                        totalwidth = width - prev_width;
                    Ext.get(fill_space_id).setStyle({width : Math.round(totalwidth)+'px',left : prev_width+'px'});
                } else {
                    Ext.get(fill_space_id).setStyle({width : Math.round(width)+'px'});
                }
            });
        
        Ext.each(thumbarr,function(item,i){
	    item.on('dragstart',function(thumb){
		console.log("dragstart")
                me.thumbAdjust(slider,thumb,i);
            });
	    
	    item.on('drag',function(thumb){
		console.log("drag")
                //me.thumbAdjust(slider,thumb,i);
            });
	    
            item.on('dragend',function(thumb){
		console.log("dragend")
                //me.thumbAdjust(slider,thumb,i);
            });
        });
    },
    thumbAdjust : function(slider,thumb,i){
	console.log(thumb)
        var fill_space_id = "fill-"+thumb.getId(),
            width  = thumb.translatableBehavior.translatable.x;
                console.log(width);
                if(i == 0){
                    console.log("if");
                    Ext.get(fill_space_id).setStyle({width : Math.round(width)+'px'});
                    if(slider.getComponent().getThumb(i+1)){
                        var next_thumb =  slider.getComponent().getThumb(i+1),
                            fill_id =  "fill-"+next_thumb.id,
                            next_width =  next_thumb.translatableBehavior.translatable.x,
                            totalwidth = next_width - width;
                        Ext.get(fill_id).setStyle({width : Math.round(totalwidth)+'px',left : width+'px'});
                    }
                  
                } else if( i == ((thumbarr.length)-1)){
                    console.log("else if");
                    if(slider.getComponent().getThumb(i-1)){
                    var prev_thumb =  slider.getComponent().getThumb(i-1),
                        prev_width =  prev_thumb.translatableBehavior.translatable.x,
                        totalwidth = width - prev_width;
                        Ext.get(fill_space_id).setStyle({width : Math.round(totalwidth)+'px',left : prev_width+'px'});
                    }
                } else {
                    console.log("else");
                      var prev_thumb =  slider.getComponent().getThumb(i-1),next_thumb =  slider.getComponent().getThumb(i+1),
                        prev_width =  prev_thumb.translatableBehavior.translatable.x,
                        next_width =  next_thumb.translatableBehavior.translatable.x,
                        totalwidth = width - prev_width;
                        Ext.get(fill_space_id).setStyle({width : Math.round(totalwidth)+'px',left : prev_width+'px'});
                        
                        if(slider.getComponent().getThumb(i+1)){
                            var next_thumb =  slider.getComponent().getThumb(i+1),
                                fill_id =  "fill-"+next_thumb.id,
                                next_width =  next_thumb.translatableBehavior.translatable.x,
                                totalwidth = next_width - width;
                            Ext.get(fill_id).setStyle({width : Math.round(totalwidth)+'px',left : width+'px'});
                        }
                }
    }
});