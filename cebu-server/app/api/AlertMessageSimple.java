package api;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import models.AlertMessage;



public class AlertMessageSimple {

    public Long id;
    public Date timestamp;
    public String generalDescription;
    public String account;


    public AlertMessageSimple(AlertMessage message)
    {
        this.id = message.id;
    	this.timestamp = message.timestamp;
    	this.generalDescription = message.generalDescription;

        this.account = message.account.username;
    	
    }

  }





