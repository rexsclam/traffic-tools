package api;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import controllers.Security;

import models.Alert;
import models.AlertMessage;

public class AlertSimple {
	
	public String account;
	
    public Long id;
    
    public String title;
	public String type;
    
	public Boolean publiclyVisible;
	
	public String generalDescription;
    public String locationDescription;
    
    public Double locationLat;
    public Double locationLon;
    
    public Date activeFrom;
    public Date activeTo;
    
    public String mode1;
    public String mode2;
    public String mode3;
    public String mode4;
    
    public String person1age;
    public String person1gender;
    public String person1injury;
    
    public String person2age;
    public String person2gender;
    public String person2injury;
    
    public String person3age;
    public String person3gender;
    public String person3injury;
    
    public String person4age;
    public String person4gender;
    public String person4injury;
    
    public String logBook;
    public String hitRun;
    public String weather;
    
    public String trafficEnforcer;
    public String dataEntryPerson;
    
    public String internalNotes;
    
    public Boolean hideFromMap;

    

    public List<AlertMessageSimple> messages;

    
    
    public AlertSimple(Alert alert, Boolean shareAll)
    {
    	this.id = alert.id;
    	this.title = alert.title;
        this.type = alert.type;
        this.publiclyVisible = alert.publiclyVisible;
        this.locationDescription = alert.locationDescription;
        this.locationLat = alert.locationLat;
        this.locationLon = alert.locationLon;
        this.activeFrom = alert.activeFrom;
        this.activeTo = alert.activeTo;

		this.mode1 = alert.mode1;
		this.mode2 = alert.mode2;
		this.mode3 = alert.mode3;
		this.mode4 = alert.mode4;
		this.person1age = alert.person1age;
		this.person1gender = alert.person1gender;
		this.person1injury = alert.person1injury;
		this.person2age = alert.person2age;
		this.person2gender = alert.person2gender;
		this.person2injury = alert.person2injury;
		this.person3age = alert.person3age;
		this.person3gender = alert.person3gender;
		this.person3injury = alert.person3injury;
		this.person4age = alert.person4age;
		this.person4gender = alert.person4gender;
		this.person4injury = alert.person4injury;
		this.logBook = alert.logBook;
		this.hitRun = alert.hitRun;
		this.weather = alert.weather;
		this.trafficEnforcer = alert.trafficEnforcer;
		this.dataEntryPerson = alert.dataEntryPerson;
		this.internalNotes = alert.internalNotes;
		this.hideFromMap = alert.hideFromMap;
        
        if(shareAll) {
	    	this.generalDescription = alert.generalDescription;
	       
	        this.account = alert.account.username;
	
	        List<AlertMessage> messageList = AlertMessage.find("alert = ?", alert).fetch();
	        
	        this.messages = new ArrayList<AlertMessageSimple>();
	            
	        for(AlertMessage message : messageList)
	        {
	            this.messages.add(new AlertMessageSimple(message));
	        }
        }

    }

  }





