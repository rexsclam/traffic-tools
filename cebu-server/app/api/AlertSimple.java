package api;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import models.Alert;
import models.AlertMessage;

public class AlertSimple {

    public Long id;
	public String type;
    public String title;
    public Date activeFrom;
    public Date activeTo;
    
    public Boolean publiclyVisible;
    
    public Double locationLat;
    public Double locationLon;

    public String generalDescription;

    public String locationDescription;

    public String account;

    public List<AlertMessageSimple> messages;

    
    
    public AlertSimple(Alert alert, Boolean shareAll)
    {
    	this.id = alert.id;
        this.type = alert.type;
    	this.title = alert.title;
    	
        this.activeFrom = alert.activeFrom;
        this.activeTo = alert.activeTo;

    	this.locationLat = alert.locationLat;
        this.locationLon = alert.locationLon;

        this.locationDescription = alert.locationDescription;
        this.publiclyVisible = alert.publiclyVisible;
        
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





