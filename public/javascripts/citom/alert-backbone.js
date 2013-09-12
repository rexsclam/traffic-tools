
var AlertTypes = [{id: '', name: ''},
                  {id: 'incident', name: 'Traffic Incident'},
                  {id: 'event', name: 'Event'}, 
                  {id: 'congestion', name: 'Congestion'},
                  {id: 'roadclosed', name: 'Road Closed'},
                  {id: 'enforcement', name: 'Traffic Enforcers'},
                  {id: 'fire', name: 'Fire'},
                  {id: 'trafficlight', name: 'Traffic Signal Problem'},
                  {id: 'construction', name: 'Road Construction'},
                  {id: 'flood', name: 'Flood'},
                  {id: 'other_alert', name: 'Other'}];

var ModeTypes = [{id: '', name: ''},
                 {id: 'sedan', name: 'Sedan'},
                 {id: 'van', name: 'Van'},
                 {id: 'truck', name: 'Truck'},
                  {id: 'taxi', name: 'Taxi'}, 
                  {id: 'microbus_puj', name: 'Microbus/PUJ'},
                  {id: 'pedestrian', name: 'Pedestrian'},
                  {id: 'bicycle', name: 'Bicycle'},
                  {id: 'motorcycle', name: 'Motorcyle'},
                  {id: 'tricycle', name: 'Tricycle'},
                  {id: 'other_mode', name: 'Other'}];

var AgeTypes = [{id: '', name: ''},
                {id: '18under', name: '18 and Under'},
                 {id: '19to64', name: '19 - 64'}, 
                 {id: '65up', name: '65 and Up'}];

var GenderTypes = [{id: '', name: ''},
                   {id: 'male', name: 'Male'},
                {id: 'female', name: 'Female'}];

var InjuryTypes = [{id: '', name: ''},
                   {id: 'noharm', name: 'No Harm'},
                 {id: 'minor', name: 'Minor'}, 
                 {id: 'major', name: 'Major'},
                 {id: 'fatality', name: 'Fatality'},
                 {id: 'other_injury', name: 'Other'}];

var HitRunTypes = [{id: '', name: ''},
                   {id: 'yes', name: 'Yes'},
                   {id: 'no', name: 'No'}, 
                   {id: 'unsure', name: 'Unsure'}];

var WeatherTypes = [{id: '', name: ''},
                    {id: 'sunny', name: 'Sunny'},
                   {id: 'cloudy', name: 'Cloudy'}, 
                   {id: 'lightrain', name: 'Light Rain'}, 
                   {id: 'heavyrain', name: 'Heavy Rain'}, 
                   {id: 'other_weather', name: 'Other'}];


Handlebars.registerHelper('alert_options', function(test) {
    var ret = '';


    for (var i = 0; i < AlertTypes.length; i++) {
        var option = '<option value="' + AlertTypes[i].id +'"';
        if (test && test.toLowerCase() == AlertTypes[i].id.toLowerCase()) {
            option += ' selected="selected"';
        }
        option += '>'+ AlertTypes[i].name + '</option>';
        ret += option;
    }

    return new Handlebars.SafeString(ret);
});

Handlebars.registerHelper('mode_options', function(test) {
    var ret = '';


    for (var i = 0; i < ModeTypes.length; i++) {
        var option = '<option value="' + ModeTypes[i].id +'"';
        if (test && test.toLowerCase() == ModeTypes[i].id.toLowerCase()) {
            option += ' selected="selected"';
        }
        option += '>'+ ModeTypes[i].name + '</option>';
        ret += option;
    }

    return new Handlebars.SafeString(ret);
});

Handlebars.registerHelper('age_options', function(test) {
    var ret = '';


    for (var i = 0; i < AgeTypes.length; i++) {
        var option = '<option value="' + AgeTypes[i].id +'"';
        if (test && test.toLowerCase() == AgeTypes[i].id.toLowerCase()) {
            option += ' selected="selected"';
        }
        option += '>'+ AgeTypes[i].name + '</option>';
        ret += option;
    }

    return new Handlebars.SafeString(ret);
});

Handlebars.registerHelper('gender_options', function(test) {
    var ret = '';


    for (var i = 0; i < GenderTypes.length; i++) {
        var option = '<option value="' + GenderTypes[i].id +'"';
        if (test && test.toLowerCase() == GenderTypes[i].id.toLowerCase()) {
            option += ' selected="selected"';
        }
        option += '>'+ GenderTypes[i].name + '</option>';
        ret += option;
    }

    return new Handlebars.SafeString(ret);
});

Handlebars.registerHelper('injury_options', function(test) {
    var ret = '';


    for (var i = 0; i < InjuryTypes.length; i++) {
        var option = '<option value="' + InjuryTypes[i].id +'"';
        if (test && test.toLowerCase() == InjuryTypes[i].id.toLowerCase()) {
            option += ' selected="selected"';
        }
        option += '>'+ InjuryTypes[i].name + '</option>';
        ret += option;
    }

    return new Handlebars.SafeString(ret);
});

Handlebars.registerHelper('hitrun_options', function(test) {
    var ret = '';


    for (var i = 0; i < HitRunTypes.length; i++) {
        var option = '<option value="' + HitRunTypes[i].id +'"';
        if (test && test.toLowerCase() == HitRunTypes[i].id.toLowerCase()) {
            option += ' selected="selected"';
        }
        option += '>'+ HitRunTypes[i].name + '</option>';
        ret += option;
    }

    return new Handlebars.SafeString(ret);
});

Handlebars.registerHelper('weather_options', function(test) {
    var ret = '';


    for (var i = 0; i < WeatherTypes.length; i++) {
        var option = '<option value="' + WeatherTypes[i].id +'"';
        if (test && test.toLowerCase() == WeatherTypes[i].id.toLowerCase()) {
            option += ' selected="selected"';
        }
        option += '>'+ WeatherTypes[i].name + '</option>';
        ret += option;
    }

    return new Handlebars.SafeString(ret);
});

Handlebars.registerHelper('formatDate', function(date, options) {

  if(date)
    return date.format('llll');
});

Handlebars.registerHelper('alertType', function(type, options) {
  for (var i = 0; i < AlertTypes.length; i++) {
    if(AlertTypes[i].id == type)
    return AlertTypes[i].name;
  }
  return "";
});

var Alert = Backbone.Model.extend({ 

  	initialize: function(){
  		
  	},

    // manually flagging date objects
    dateAttributes: ['activeFrom', 'activeTo', 'timestamp'],

  	defaults: {  
  		account: null,
	    title: null,
	    type: null,
	    publiclyVisible: null,
	    generalDescription: null,
	    locationDescription: null,
	    locationLat: null,
	    locationLon: null,
	    activeFrom: null,
	    activeTo: null,
	    mode1: null,
	    mode2: null,
	    mode3: null,
	    mode4: null,
	    person1age: null,
	    person1gender: null,
	    person1injury: null,
	    person2age: null,
	    person2gender: null,
	    person2injury: null,
	    person3age: null,
	    person3gender: null,
	    person3injury: null,
	    person4age: null,
	    person4gender: null,
	    person4injury: null,
	    totalInjuries: null,
	    totalFatalities: null,
	    logBook: null,
	    hitRun: null,
	    weather: null,
	    trafficEnforcer: null,
	    dataEntryPerson: null,
	    internalNotes: null,
	    hideFromMap: null
    },

    toJSON: function(options, node) {

      var modifiedObj;

      if(node == undefined)
        modifiedObj = _.clone(this.attributes);
      else
        modifiedObj = node;

      for (var field in modifiedObj) {
          if(modifiedObj[field])
          {
            if($.inArray(field, this.dateAttributes) >= 0) {
              var value = modifiedObj[field]; 
              
              modifiedObj[field] = modifiedObj[field].unix() * 1000;
            }
            else if($.isArray(modifiedObj[field])) {
              for(var obj in modifiedObj[field]) {
                modifiedObj[field][obj] = this.toJSON(null, modifiedObj[field][obj]);
              }
            }
            else if($.isPlainObject(modifiedObj[field])) {
              modifiedObj[field] = this.toJSON(null, modifiedObj[field]);
            }
          }
      }

      return modifiedObj;
    },

    // recursively convert unix timestamps specifed in dateAttributes[] to moment.js date/time
    parse: function(resp, options) {
      for (var field in resp) {
          if($.inArray(field, this.dateAttributes) >= 0) {
            var value = resp[field]; 
            
            if(resp[field])
              resp[field] = moment.unix(resp[field] / 1000);
            else
              resp[field] = null;
          }
          else if($.isArray(resp[field])) {
            for(var obj in resp[field]) {
              resp[field][obj] = this.parse(resp[field][obj]);
            }
          }
          else if($.isPlainObject(resp[field])) {
            resp[field] = this.parse(resp[field]);
          }
        
      }
      return resp;
    }
});

// the main collection
var AlertCollection =  Backbone.Collection.extend({  
        
        model : Alert,  
        url: '/citom/alerts/',

       initialize: function( opts ){

            this.dataParam = {};
            this.onSuccess = opts.success;
            this.view = opts.view;
          },

          getData: function(opts){

            if(opts != null)
              this.dataParam = opts;              

            if(this.dataParam != undefined)
              this.fetch({data: $.param(this.dataParam), update: true, success: this.onSuccess});
            else
              this.fetch({update: true});
            
            
          },
          
          onMap: function() {
        	    filtered = this.filter(function(alert) {
        	      return alert.get("hideFromMap") === false;
        	      });
        	    return new AlertCollection(filtered);
          },

          downloadCsv: function() {
              var csvParams = _.clone(this.dataParam);
              csvParams.csv = true;
              window.location.href = this.url + '?' + $.param(csvParams);

          }



    });  

var AlertFilterView = Backbone.View.extend({

    tagName: "div",
    className: "filter-content",

   events: {
      'click #filterToday': 'today',
      'click #filterYesterday': 'yesterday',
      'click #filterThisWeek': 'thisWeek',
      'click #updateFilter': 'updateFilter',
      'click #showActive': 'showActive',
      'click #showAll': 'showAll',
      'click #downloadCsv': 'downloadCsv'
    },
   
    initialize: function ( opts ) { 

      this.map = opts.map;
      this.collection = opts.collection;

      this.alertFilerTemplate = Handlebars.compile($("#alert-filter-tpl").html());

      this.filterPanel = $("#alertFilter");

      this.filterPanel.html(this.$el[0]);

      this.render();
    },

    showAll: function() {
      $("#dataRangeFilter").show();

    },

    showActive: function() {
      $("#dataRangeFilter").hide();

    },

    today: function() {
      var now = moment();
      this.dateTo.datepicker('setDate', now.toDate());
      this.dateFrom.datepicker('setDate', now.toDate());

    },

    yesterday: function() {
      var yesterday = moment().subtract('days', 1);
      this.dateTo.datepicker('setDate', yesterday.toDate());
      this.dateFrom.datepicker('setDate', yesterday.toDate());
    },

    thisWeek: function() {
      var now = moment();
      var week = moment().subtract('days', 7);
      this.dateTo.datepicker('setDate', now.toDate());
      this.dateFrom.datepicker('setDate', week.toDate());
    },
    /*
    thisWeek: function() {
      var now = moment();
      var week = moment().subtract('days', 7);
      this.dateTo.datepicker('setDate', now.toDate());
      this.dateFrom.datepicker('setDate', week.toDate());
    },
	*/
    render: function () {

      data = {type: null}

      this.$el.html(this.alertFilerTemplate(data));
      
      this.finalize();

      return this;
    },

    updateFilter: function () {
      var fd = this.dateFrom.data('datepicker').date;
      var td = this.dateTo.data('datepicker').date;

      var fromTimestamp = moment(fd).format("MM/DD/YYYY");
      var toTimestamp = moment(td).format("MM/DD/YYYY");

      var active;
      
      if($('button[name="fitlerActive"].active').val() == 'active')
        active = true;
      else
        active = false;

      var data = {  type: this.$("#typeFilter").val(),
                    active: active,
                    fromDate: fromTimestamp,
                    toDate: toTimestamp,
                    query: this.$("#query").val()
      };

      this.collection.getData(data);
    },


    downloadCsv: function () {

      this.updateFilter();

      this.collection.downloadCsv();

    },

    finalize: function() {  

      var view = this;
      // build dropdown with icons
    
      var format = function(state) {
          if (!state.id) return state.text; // optgroup
          return '<img class="flag" style="height: 25px" src="/public/images/alert_icons/' + state.id + '.png"/> ' + state.text;
      }

      this.dateFrom =this.$("#dateFrom").datepicker({autoclose: true}).on('changeDate', function(ev) { view.dateFrom.datepicker("hide");});
      this.dateTo =this.$("#dateTo").datepicker({autoclose: true}).on('changeDate', function(ev) { view.dateTo.datepicker("hide");});

      this.today();

      this.dropdown = this.$("#typeFilter").select2({
          formatResult: format,
          formatSelection: format,
          escapeMarkup: function(m) { return m; }
      });

      $("#dataRangeFilter").hide();

      this.updateFilter();

    }

  });

var AlertEditorView = Backbone.View.extend({

    tagName: "div",
    className: "editor-content",

   events: {
        'click #cancel': 'cancel',
        'click #save': 'save',
        'click #fromNow': 'fromNow',
        'click #toNow': 'toNow',
        'click #toClear': 'toClear',
        'click #showModes': 'showModes',
        'click #showPeople': 'showPeople'
    },
   
    initialize: function ( opts ) { 

      this.map = opts.map;
      this.collection = opts.collection;

      
      var view = this;

      if(this.model == undefined)
          this.model = new Alert();
  
      this.alertEditorTemplate = Handlebars.compile($("#incident-edit-tpl").html());
      
      // Add a layer group for alert editor markers
      this.alertEditorLayerGroup = L.layerGroup().addTo(this.map);

      this.editorPanel = $("#alertEditor");

      this.editorPanel.html(this.$el[0]);

      this.editorPanel.hide();

      _.bindAll(this, 'save', 'edit', 'new');
      
      this.render();
  
    },
    
    showModes: function() {
    	$("#modes_hidden").toggle();
    	if($("#showModes").text() == 'Add Modes'){
            $("#showModes").text('Remove Modes');
        } else {
            $("#showModes").text('Add Modes');
        }
    },
    
    showPeople: function() {
    	$("#people_hidden").toggle();
    	if($("#showPeople").text() == 'Add People'){
            $("#showPeople").text('Remove People');
        } else {
            $("#showPeople").text('Add People');
        }
    },

    edit: function(id) {
      this.model = this.collection.get(id);
      
      this.render_edit();

      this.dateFrom.datepicker('setDate', this.model.attributes.activeFrom.toDate());
      this.timeFrom.timepicker('setTime', this.model.attributes.activeFrom.format('h:mm a'));

      if(this.model.attributes.activeTo) {
        this.dateTo.datepicker('setDate', this.model.attributes.activeTo.toDate());
        this.timeTo.timepicker('setTime', this.model.attributes.activeTo.format('h:mm a'));
      }
      else {
        this.toClear();
      }

      
      

      this.showPanel();
    },

    new: function(lat, lon) {
      this.hidePanel();

      this.model.attributes.locationLat = lat;
      this.model.attributes.locationLon = lon;
      
      this.showPanel();

      this.fromNow();
      this.toClear();

    },

    save: function() {
      
      var fd = this.dateFrom.data('datepicker').date;
      var td = this.dateTo.data('datepicker').date;

      var ftHour = this.timeFrom.data('timepicker').hour;
      var ftMinute = this.timeFrom.data('timepicker').minute;
      var ftMeridian = this.timeFrom.data('timepicker').meridian;

      var ttHour = this.timeTo.data('timepicker').hour;
      var ttMinute = this.timeTo.data('timepicker').minute;
      var ttMeridian = this.timeTo.data('timepicker').meridian;

      var fromTimestamp = moment(moment(fd).format("YYYY-MM-DD") + " " + ftHour + ":" + ftMinute + " " + ftMeridian, "YYYY-MM-DD hh:mm a");
      
      var toTimestamp; 

      if(this.$("#datepickerTo input").val() != "" || this.$("#timepickerTo").val() != "" )
      {
        toTimestamp = moment(moment(td).format("YYYY-MM-DD") + " " + ttHour + ":" + ttMinute + " " + ttMeridian, "YYYY-MM-DD hh:mm a");
      }
      else
      {
        toTimestamp = null;
      }

      var data = {  type: this.$("#type").val(),
                    title: this.$("#title").val(),
                    publiclyVisible: this.$("#publiclyVisible").is(':checked'),
                    generalDescription: this.$("#generalDescription").val(),
                    locationDescription: this.$("#locationDescription").val(),
                    locationLat: this.model.attributes.locationLat,
                    locationLon: this.model.attributes.locationLon,
                    activeFrom: fromTimestamp,
                    activeTo: toTimestamp,
                    mode1: this.$("#mode1").val(),
                    mode2: this.$("#mode2").val(),
                    mode3: this.$("#mode3").val(),
                    mode4: this.$("#mode4").val(),
                    person1age: this.$("#person1age").val(),
                    person1gender: this.$("#person1gender").val(),
                    person1injury: this.$("#person1injury").val(),
                    person2age: this.$("#person2age").val(),
                    person2gender: this.$("#person2gender").val(),
                    person2injury: this.$("#person2injury").val(),
                    person3age: this.$("#person3age").val(),
                    person3gender: this.$("#person3gender").val(),
                    person3injury: this.$("#person3injury").val(),
                    person4age: this.$("#person4age").val(),
                    person4gender: this.$("#person4gender").val(),
                    person4injury: this.$("#person4injury").val(),
                    totalInjuries: this.$("#totalInjuries").val(),
                    totalFatalities: this.$("#totalFatalities").val(),
                    logBook: this.$("#logBook").val(),
                    hitRun: this.$("#hitRun").val(),
                    weather: this.$("#weather").val(),
                    trafficEnforcer: this.$("#trafficEnforcer").val(),
                    dataEntryPerson: this.$("#dataEntryPerson").val(),
                    internalNotes: this.$("#internalNotes").val(),
                    hideFromMap: this.$("#hideFromMap").is(':checked')
                    
      };

      if(this.model.id)
      {
        // existing model, update and save
        this.model.set(data);
        this.model.save();
      } 
      else
      {
        this.model.set(data);
        this.collection.add(this.model,  {silent: true});
        this.model.save();
      }

      this.hidePanel();

      this.collection.getData();
    },

    showPanel: function() {
      this.editorPanel.show();

      var markerLayer = L.marker([this.model.attributes.locationLat, this.model.attributes.locationLon], {
        draggable: false
      });
      
      this.alertEditorLayerGroup.addLayer(markerLayer);
      
      //move to center of page
      this.map.panTo(markerLayer.getLatLng());
      
      markerLayer.bindLabel("Editing...");
      markerLayer.noHide(false);
      markerLayer.showLabel();
    },

    hidePanel: function() {
      
      if(this.markerLayer != undefined) {
        this.markerLayer.noHide(false);
        this.markerLayer.hideLabel();
      }

      this.editorPanel.hide();
      this.model = new Alert();
      this.render();

      this.alertEditorLayerGroup.clearLayers();
    },

    cancel: function() {
      this.hidePanel();
    },

    toNow: function() {
      var now = new Date();
      this.dateTo.datepicker('setDate', now);
      this.timeTo.timepicker('setTime', moment(now).format('h:mm a'));
    },

    toClear: function() {
      this.$("#datepickerTo input").val("")
      this.timeTo.val("");
    },

    fromNow: function() {
      var now = new Date();
      this.dateFrom.datepicker('setDate', now);
      this.timeFrom.timepicker('setTime', moment(now).format('h:mm a'));
    },

    // move map/sidebar rendering here?
    render: function () {

      this.$el.html(this.alertEditorTemplate(this.model.attributes));
      this.finalize();
      return this;
    },
    
    render_edit: function () {
	    this.$el.html(this.alertEditorTemplate(this.model.attributes));
	    $('#hideFromMap_hidden').css('display','inline');
	    this.finalize();
	    return this;
    },
    
    finalize: function() {

      var view = this;
      // build dropdown with icons
    
      var format = function(state) {
          if (!state.id) return state.text; // optgroup
          return '<img class="flag" style="height: 25px" src="/public/images/alert_icons/' + state.id + '.png"/> ' + state.text;
      }

      this.dateFrom =this.$("#datepickerFrom").datepicker({autoclose: true}).on('changeDate', function(ev) { view.dateFrom.datepicker("hide");});
      this.dateTo =this.$("#datepickerTo").datepicker({autoclose: true}).on('changeDate', function(ev) { view.dateTo.datepicker("hide");});

      this.timeFrom = this.$("#timepickerFrom").timepicker().on('changeDate', function(ev) { view.timeFrom.timepicker("hide");});
      this.timeTo = this.$("#timepickerTo").timepicker().on('changeTime', function(ev) { view.timeTo.datepicker("hide");});

      this.dropdown = this.$("#type").select2({
    	  placeholder: "Choose type",
          formatResult: format,
          formatSelection: format,
          escapeMarkup: function(m) { return m; }
      });
      
      this.dropdown = this.$("#mode1").select2({
    	  placeholder: "Choose mode",

          escapeMarkup: function(m) { return m; }
      });

      this.dropdown = this.$("#mode2").select2({
    	  placeholder: "Choose mode",
          escapeMarkup: function(m) { return m; }
      });
      
      this.dropdown = this.$("#mode3").select2({
    	  placeholder: "Choose mode",
          escapeMarkup: function(m) { return m; }
      });
      
      this.dropdown = this.$("#mode4").select2({
    	  placeholder: "Choose mode",
          escapeMarkup: function(m) { return m; }
      });
      
      this.dropdown = this.$("#person1age").select2({
    	  placeholder: "Choose age",
          escapeMarkup: function(m) { return m; }
      });
      
      this.dropdown = this.$("#person1gender").select2({
    	  placeholder: "Choose gender",
          escapeMarkup: function(m) { return m; }
      });
      
      this.dropdown = this.$("#person1injury").select2({
    	  placeholder: "Choose injury",
          escapeMarkup: function(m) { return m; }
      });
      
      this.dropdown = this.$("#person2age").select2({
    	  placeholder: "Choose age",
          escapeMarkup: function(m) { return m; }
      });
      
      this.dropdown = this.$("#person2gender").select2({
    	  placeholder: "Choose gender",
          escapeMarkup: function(m) { return m; }
      });
      
      this.dropdown = this.$("#person2injury").select2({
    	  placeholder: "Choose injury",
          escapeMarkup: function(m) { return m; }
      });
      
      this.dropdown = this.$("#person3age").select2({
    	  placeholder: "Choose age",
          escapeMarkup: function(m) { return m; }
      });
      
      this.dropdown = this.$("#person3gender").select2({
    	  placeholder: "Choose gender",
          escapeMarkup: function(m) { return m; }
      });
      
      this.dropdown = this.$("#person3injury").select2({
    	  placeholder: "Choose injury",
          escapeMarkup: function(m) { return m; }
      });
      this.dropdown = this.$("#person4age").select2({
    	  placeholder: "Choose age",
          escapeMarkup: function(m) { return m; }
      });
      
      this.dropdown = this.$("#person4gender").select2({
    	  placeholder: "Choose gender",
          escapeMarkup: function(m) { return m; }
      });
      
      this.dropdown = this.$("#person4injury").select2({
    	  placeholder: "Choose injury",
          escapeMarkup: function(m) { return m; }
      });
      
      this.dropdown = this.$("#hitRun").select2({
    	  placeholder: "Yes/No/Unsure",
          escapeMarkup: function(m) { return m; }
      });
      
      this.dropdown = this.$("#weather").select2({
    	  placeholder: "Choose weather",
          escapeMarkup: function(m) { return m; }
      });
      
      this.$("popupContent").on("click", this.distroyDropdowns);


    },

    distroy: function() {
      
      this.distroyDropdowns();
    },

    distroyDropdowns: function() {

      // annoying cleanup of dropdowns bound to the popup view.

      if(this.dropdown)
        this.dropdown.select2("close");
      if(this.dateFrom)
        this.dateFrom.datepicker("hide");
      if(this.dateTo)
        this.dateTo.datepicker("hide");
    }

})

var AlertPopupView = Backbone.View.extend({

    tagName: "div",
    className: "popup-content",

   events: {
        'click #sendMessage': 'sendMessage',
        'click #editAlert': 'editAlert'
    },
    initialize: function ( opts ) {
       
      this.alertPopupTemplate = Handlebars.compile($("#incident-view-popup-tpl").html());
      
      this.listenTo(this.model, "change", this.render);

      _.bindAll(this, 'editAlert', 'sendMessage');
      
      this.render();
  
    },

    editAlert: function() {
    	
      this.trigger('editAlert', this.model.id);
    },

    sendMessage: function() {

      if($.trim(this.$("#message").val()) == "")
        return;


      var data = {id: this.model.id, message: this.$("#message").val()};
      var view = this;

      $.ajax({type: "POST", url: "/citom/saveAlertMessage",data: data, success: function() { 
        this.collection.getData();

      } });

      this.$("#message").val(""); 
    },


    // move map/sidebar rendering here?
    render: function () {
    	
      this.$el.html(this.alertPopupTemplate(this.model.attributes));

      return this;
    }

})

var AlertMapView = Backbone.View.extend({

	initialize: function ( opts ) {
      
      var view = this;


      // set update frequency from otps
      this.updateFrequency = opts.updateFrequency;

      // create/bind collection if not set via opts
      if(opts.collection == undefined)
          this.collection = new AlertCollection({success: this.onCollectionUpdate});
      
      // Marker caches
      this.alertLayers = {};

      // Li caches
      this.alertItems = {};
      
      // Event bindings for the taxi collection
      this.collection.on('add', this.onModelAdd, this);
      this.collection.on('reset', this.onCollectionReset, this);
      this.collection.on('remove', this.onModelRemove, this);
      this.collection.on('change', this.onModelChange, this);
      
      // Custom icons

      this.icons = {}

      for(id in AlertTypes)
      {
        var type = AlertTypes[id].id;
        this.icons[type] = L.icon({
          iconUrl: '/public/images/alert_icons/' + type + '.png',
          iconSize: [32, 37],
          iconAnchor: [16, 37],
          popupAnchor: [0, -37],
          labelAnchor: [10, -16]
        });
      }
      
      this.icons[""] = L.icon({
          iconUrl: '/public/images/alert_icons/blank.png',
          iconSize: [32, 37],
          iconAnchor: [16, 37],
          popupAnchor: [0, -37],
          labelAnchor: [10, -16]
        });

    
     // Base layer config is optional, default to Mapbox Streets
      var url = 'http://{s}.tiles.mapbox.com/v3/conveyal.map-jc4m5i21/{z}/{x}/{y}.png';
          baseLayer = L.tileLayer(url, {
            attribution: '&copy; OpenStreetMap contributors, CC-BY-SA. <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>' 
          });

      // Init the map
      this.map = L.map($('#map').get(0), {
        center: [10.31741, 123.894], //TODO: add to the config file for now
        zoom: 15,
        maxZoom: 17
      });

      this.map.addLayer(baseLayer);

      // Remove default prefix
      this.map.attributionControl.setPrefix('');

      this.map.on('contextmenu', this.addIncident, this);

      // Add a layer group for taxis
      this.alertLayerGroup = L.layerGroup().addTo(this.map);

      this.editor = new AlertEditorView({map: this.map, collection: this.collection});
      this.filter = new AlertFilterView({collection: this.collection});

      //this.updateAlerts();

      this.startTimer();

      _.bindAll(this, 'openPopup', 'addIncident');
      

    },

    startTimer: function() {
      var view = this;
      if(view.updateFrequency)
        view.timer = setInterval(function () { view.collection.getData() }, view.updateFrequency)
    },

    updateAlerts: function() {

      this.collection.getData();
      
    },

    openPopup: function(modelId)
    {
      var data = this.collection.get(modelId);

      this.popupView = new AlertPopupView({model: data, map: this, collection: this.collection});

      var view = this;

      this.popupView.on('editAlert', function(id) {view.editor.edit(id);})

      this.alertLayers[modelId].bindPopup(this.popupView.$el[0]).openPopup();

     // this.popupView.finalize();
    
    },

    addIncident: function(mapEvent) {


      this.editor.new(mapEvent.latlng.lat, mapEvent.latlng.lng);
     
    },

    showLabels: function(show) {

      this._showLabels = show;

      for(marker_id in this.alertLayers)
      {
        if(show)
        {
          this.alertLayers[marker_id].noHide(true);
          this.alertLayers[marker_id].showLabel();
        }
        else
        {
          this.alertLayers[marker_id].noHide(false);
          this.alertLayers[marker_id].hideLabel();
        }

      }
    },

    // move map/sidebar rendering here?
    render: function () {

      return this;
    },

    // When the stop collection resets, clear all the markers and add new ones.
    onCollectionReset: function() {
      //this.stopLayerGroup.clearLayers();

      var removeList = {}
      

      this.collection.each(function(model, i) {
    	
		if(this.alertLayers[model.id] == undefined)
			this.onModelAdd(model);
		else
			this.onModelChange(model);

        removeList[model.id] = false;
      }, this);

      
    },

    onModelChange: function(model) {

      if(this.alertLayers[model.id] == undefined)
        this.onModelAdd(model);
      
      if(model.attributes.hideFromMap == false || model.attributes.hideFromMap == null) {
      // move marker
    	this.alertLayers[model.id].setLatLng([model.get('locationLat'), model.get('locationLon')]);

      // set marker icon
      this.alertLayers[model.id].setIcon(this.icons[model.get('type')]);
      }
      
      else {
    	  this.onModelRemove(model);
      }
    },

    // Clean up when a alert model is removed from the collection (ie deleted)
    onModelRemove: function(model) {

      if(model.id != null)
      {
        this.alertLayers[model.id].noHide(false);
        this.alertLayerGroup.removeLayer(this.alertLayers[model.id]);

        delete this.alertLayers[model.id];

        delete this.alertItems[model.id];
      }
    },

    // Add the marker and bind events when a new alert is created.
    onModelAdd: function(model) {
    	if (model.attributes.hideFromMap == false || model.attributes.hideFromMap == null) {
	      var markerLayer;
	      var markerIcon = this.icons[model.get('type')];
	
	      if(markerIcon == null)
	        return false;
	
	        this.alertLayers[model.id] = markerLayer = L.marker([model.get('locationLat'), model.get('locationLon')], {
	            draggable: false,
	            id: model.id,
	            icon: markerIcon
	          });
	        
	        if(model.get('title') != undefined)
	          markerLayer.bindLabel(model.get('title'), {noHide: this._showLabels});
	
	      var view = this;
	
	      var modelId = model.id;
	
	      // trigger the sidebar actions when the icon is clicked.
	      markerLayer.on('click', function(evt) {
	        view.openPopup(modelId)
	      }, this);
	
	      // Add it to the map
	      this.alertLayerGroup.addLayer(markerLayer);
	
	      // turn on labels
	      if(this._showLabels)
	          markerLayer.showLabel();

    	}
    },

 });  