$(function(){ //DOM Ready

    function navigate(url)
    {
        window.location.href = url;
    }

    $(document).attr("title", "Main Panel");
    content_width = (120 + 5) * 8 + 5
    $('.gridster').width(content_width)
    $(".gridster ul").gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [120, 120],
        avoid_overlapped_widgets: true,
        max_rows: 15,
        max_size_x: 8,
        shift_widgets_up: false
    }).data('gridster').disable();
    
    // Add Widgets

    var gridster = $(".gridster ul").gridster().data('gridster');
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseclock-default-clock-clock" id="default-clock-clock"><h1 class="date"data-bind="text: date, attr: {style: date_style}"></h1><h2 class="time" data-bind="text: time, attr: {style: time_style}"></h2></div></li>', 3, 1, 1, 1)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baselight-default-light-ailivingroomorb" id="default-light-ailivingroomorb"><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><h2 class="icon" data-bind="attr:{style: icon_style}"><i data-bind="attr: {class: icon}"></i></h2><span class="toggle-area" id="switch"></span><p class="state_text" data-bind="text: state_text, attr:{style: state_text_style}"></p><div class="levelunit"><p class="level" data-bind="text: level, attr:{style: level_style}"></p><p class="unit" data-bind="html: units, attr:{style: unit_style}"></p></div><p class="secondary-icon minus"><i data-bind="attr: {class: icon_down, style: level_down_style}" id="level-down"></i></p><p class="secondary-icon plus"><i data-bind="attr: {class: icon_up, style: level_up_style}" id="level-up"></i></p></div></li>', 1, 1, 4, 1)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseswitch-default-take-livingroom-picture" id="default-take-livingroom-picture"><span class="toggle-area" id="switch"></span><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><h2 class="icon" data-bind="attr:{style: icon_style}"><i data-bind="attr: {class: icon}"></i></h2><h1 class="state_text" data-bind="text: state_text, attr: {style: state_text_style}"></h1></div></li>', 3, 1, 1, 2)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseswitch-default-take-bedroom-picture" id="default-take-bedroom-picture"><span class="toggle-area" id="switch"></span><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><h2 class="icon" data-bind="attr:{style: icon_style}"><i data-bind="attr: {class: icon}"></i></h2><h1 class="state_text" data-bind="text: state_text, attr: {style: state_text_style}"></h1></div></li>', 1, 1, 4, 2)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseswitch-default-take-fridge-picture" id="default-take-fridge-picture"><span class="toggle-area" id="switch"></span><h1 class="title" data-bind="text: title, attr:{style: title_style}"></h1><h1 class="title2" data-bind="text: title2, attr:{style: title2_style}"></h1><h2 class="icon" data-bind="attr:{style: icon_style}"><i data-bind="attr: {class: icon}"></i></h2><h1 class="state_text" data-bind="text: state_text, attr: {style: state_text_style}"></h1></div></li>', 1, 1, 6, 2)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseiframe-default-livingroom-camera" id="default-livingroom-camera"><div class="outer-frame iframe"><iframe class="scaled-frame" data-bind="attr: {style: frame_style, src: frame_src}" allowfullscreen></iframe></div><div class="outer-image"><img class="img-frame" data-bind="attr: {src: img_src}"></img></div><h1 class="title" data-bind="text: title, attr: {style: title_style}"></h1></div></li>', 3, 4, 1, 3)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseiframe-default-bedroom-camera" id="default-bedroom-camera"><div class="outer-frame iframe"><iframe class="scaled-frame" data-bind="attr: {style: frame_style, src: frame_src}" allowfullscreen></iframe></div><div class="outer-image"><img class="img-frame" data-bind="attr: {src: img_src}"></img></div><h1 class="title" data-bind="text: title, attr: {style: title_style}"></h1></div></li>', 3, 2, 4, 3)
    
        gridster.add_widget('<li><div data-bind="attr: {style: widget_style}" class="widget widget-baseiframe-default-fridge-camera" id="default-fridge-camera"><div class="outer-frame iframe"><iframe class="scaled-frame" data-bind="attr: {style: frame_style, src: frame_src}" allowfullscreen></iframe></div><div class="outer-image"><img class="img-frame" data-bind="attr: {src: img_src}"></img></div><h1 class="title" data-bind="text: title, attr: {style: title_style}"></h1></div></li>', 3, 2, 4, 5)
    
    
    
    var widgets = {}
    // Initialize Widgets
    
        widgets["default-clock-clock"] = new baseclock("default-clock-clock", "", "default", {'fields': {'time': '', 'date': ''}, 'entity': 'clock.clock', 'static_icons': [], 'title_is_friendly_name': 1, 'static_css': {'widget_style': 'background-color: #444;', 'time_style': 'color: #aa00ff;', 'date_style': 'color: #fff;'}, 'use_hass_icon': 1, 'precision': 1, 'use_comma': 0, 'icons': [], 'widget_type': 'baseclock', 'css': {}})
    
        widgets["default-light-ailivingroomorb"] = new baselight("default-light-ailivingroomorb", "", "default", {'post_service_active': {'service': 'homeassistant/turn_on', 'entity_id': 'light.ailivingroomorb'}, 'post_service_inactive': {'service': 'homeassistant/turn_off', 'entity_id': 'light.ailivingroomorb'}, 'title_is_friendly_name': 1, 'static_css': {'state_text_style': 'color: #fff;', 'level_up_style': 'color: #888;', 'level_down_style': 'color: #888;', 'widget_style': 'background-color: #444;', 'title2_style': 'color: #fff;', 'unit_style': 'color: #fff;', 'level_style': 'color: #fff;', 'title_style': 'color: #fff;'}, 'precision': 1, 'widget_type': 'baselight', 'css': {'icon_style_inactive': 'color: #888;', 'icon_style_active': 'color: #aaff00;'}, 'entity': 'light.ailivingroomorb', 'static_icons': {'icon_down': 'fa-minus', 'icon_up': 'fa-plus'}, 'fields': {'level': '', 'units': '%', 'icon': '', 'icon_style': '', 'title2': '', 'title': '', 'state_text': ''}, 'use_hass_icon': 1, 'use_comma': 0, 'icons': {'icon_on': 'fa-circle', 'icon_off': 'fa-circle-thin'}})
    
        widgets["default-take-livingroom-picture"] = new baseswitch("default-take-livingroom-picture", "", "default", {'post_service_active': {'service': 'homeassistant/turn_on', 'entity_id': 'script.take_photo_livingroom'}, 'state_active': 'on', 'post_service_inactive': {'service': 'homeassistant/turn_off', 'entity_id': 'script.take_photo_livingroom'}, 'enable': 1, 'static_css': {'widget_style': 'background-color: #444;', 'title2_style': 'color: #fff;', 'title_style': 'color: #fff;', 'state_text_style': 'color: #fff;'}, 'ignore_state': 1, 'fields': {'icon_style': '', 'title2': '', 'title': 'Take Livingroom Photo', 'icon': '', 'state_text': ''}, 'css': {'icon_style_inactive': 'color: #888;', 'icon_style_active': 'color: #aaff00;'}, 'widget_type': 'baseswitch', 'state_inactive': 'off', 'entity': 'script.take_photo_livingroom', 'static_icons': [], 'precision': 1, 'use_hass_icon': 1, 'use_comma': 0, 'icons': {'icon_on': 'fa-th-large', 'icon_off': 'fa-th-large'}, 'momentary': 1000})
    
        widgets["default-take-bedroom-picture"] = new baseswitch("default-take-bedroom-picture", "", "default", {'post_service_active': {'service': 'homeassistant/turn_on', 'entity_id': 'script.take_photo_bedroom'}, 'state_active': 'on', 'post_service_inactive': {'service': 'homeassistant/turn_off', 'entity_id': 'script.take_photo_bedroom'}, 'enable': 1, 'static_css': {'widget_style': 'background-color: #444;', 'title2_style': 'color: #fff;', 'title_style': 'color: #fff;', 'state_text_style': 'color: #fff;'}, 'ignore_state': 1, 'fields': {'icon_style': '', 'title2': '', 'title': 'Take Bedroom Photo', 'icon': '', 'state_text': ''}, 'css': {'icon_style_inactive': 'color: #888;', 'icon_style_active': 'color: #aaff00;'}, 'widget_type': 'baseswitch', 'state_inactive': 'off', 'entity': 'script.take_photo_bedroom', 'static_icons': [], 'precision': 1, 'use_hass_icon': 1, 'use_comma': 0, 'icons': {'icon_on': 'fa-th-large', 'icon_off': 'fa-th-large'}, 'momentary': 1000})
    
        widgets["default-take-fridge-picture"] = new baseswitch("default-take-fridge-picture", "", "default", {'post_service_active': {'service': 'homeassistant/turn_on', 'entity_id': 'script.take_photo_fridge'}, 'state_active': 'on', 'post_service_inactive': {'service': 'homeassistant/turn_off', 'entity_id': 'script.take_photo_fridge'}, 'enable': 1, 'static_css': {'widget_style': 'background-color: #444;', 'title2_style': 'color: #fff;', 'title_style': 'color: #fff;', 'state_text_style': 'color: #fff;'}, 'ignore_state': 1, 'fields': {'icon_style': '', 'title2': '', 'title': 'Take Fridge Photo', 'icon': '', 'state_text': ''}, 'css': {'icon_style_inactive': 'color: #888;', 'icon_style_active': 'color: #aaff00;'}, 'widget_type': 'baseswitch', 'state_inactive': 'off', 'entity': 'script.take_photo_fridge', 'static_icons': [], 'precision': 1, 'use_hass_icon': 1, 'use_comma': 0, 'icons': {'icon_on': 'fa-th-large', 'icon_off': 'fa-th-large'}, 'momentary': 1000})
    
        widgets["default-livingroom-camera"] = new baseiframe("default-livingroom-camera", "", "default", {'fields': {'img_src': '', 'frame_style': '""', 'frame_src': '', 'title': ''}, 'icons': [], 'entity_picture': 'https://dk.servebeer.com/api/camera_proxy/camera.opencv_living_room?token=a3f3229af91ed6cd36ada364517caefb82a8a79c196a034ffd2c74d22f9d267d&api_password=yummybacon', 'static_icons': [], 'static_css': {'widget_style': 'background-color: #444;', 'title_style': 'background-color: rgba(0, 0, 0, 0.5);color: #fff;'}, 'use_hass_icon': 1, 'precision': 1, 'refresh': 5, 'use_comma': 0, 'widget_type': 'baseiframe', 'css': {}})
    
        widgets["default-bedroom-camera"] = new baseiframe("default-bedroom-camera", "", "default", {'fields': {'img_src': '', 'frame_style': '""', 'frame_src': '', 'title': ''}, 'icons': [], 'entity_picture': 'https://dk.servebeer.com/api/camera_proxy/camera.bedroom?token=d872dcbb64c8db5812866a97f99bc8bc4ceba34de7a28b36b76836ef400ddcf0&api_password=yummybacon', 'static_icons': [], 'static_css': {'widget_style': 'background-color: #444;', 'title_style': 'background-color: rgba(0, 0, 0, 0.5);color: #fff;'}, 'use_hass_icon': 1, 'precision': 1, 'refresh': 5, 'use_comma': 0, 'widget_type': 'baseiframe', 'css': {}})
    
        widgets["default-fridge-camera"] = new baseiframe("default-fridge-camera", "", "default", {'fields': {'img_src': '', 'frame_style': '""', 'frame_src': '', 'title': ''}, 'icons': [], 'entity_picture': 'https://dk.servebeer.com/api/camera_proxy/camera.fridge?token=aa25dba8db03e60e3af2857e307a56d43cab298fb918abb2a1e9a33fee379630&api_password=yummybacon', 'static_icons': [], 'static_css': {'widget_style': 'background-color: #444;', 'title_style': 'background-color: rgba(0, 0, 0, 0.5);color: #fff;'}, 'use_hass_icon': 1, 'precision': 1, 'refresh': 5, 'use_comma': 0, 'widget_type': 'baseiframe', 'css': {}})
    

    // Setup click handler to cancel timeout navigations

    $( ".gridster" ).click(function(){
        clearTimeout(myTimeout);
    });

    // Set up timeout

    var myTimeout

    if (location.search != "")
    {
        var query = location.search.substr(1);
        var result = {};
        query.split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
        });

        if ("timeout" in result && "return" in result)
        {
            url = result.return
            argcount = 0
            for (arg in result)
            {
                if (arg != "timeout" && arg != "return")
                {
                    if (argcount == 0)
                    {
                        url += "?";
                    }
                    else
                    {
                        url += "?";
                    }
                    argcount ++;
                    url += arg + "=" + result[arg]
                }
            }
            myTimeout = setTimeout(function() { navigate(url); }, result.timeout * 1000);
        }
    }

    // Start listening for HA Events
    if (location.protocol == 'https:')
    {
        wsprot = "wss:"
    }
    else
    {
        wsprot = "ws:"
    }
    var stream_url = wsprot + '//' + location.host + '/stream'
    ha_status(stream_url, "Main Panel", widgets);

});