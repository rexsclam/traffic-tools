package models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import play.db.jpa.Model;

@Entity
public class Alert extends Model {
	
	@ManyToOne
    public Account account;
	
	public String title;
	public String type;
    
	public Boolean publiclyVisible;
	
	@Column(columnDefinition="TEXT")
    public String generalDescription;
	
	@Column(columnDefinition="TEXT")
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
    
    public String totalInjuries;
    public String totalFatalities;
    
    public String logBook;
    public String hitRun;
    public String weather;
    
    public String trafficEnforcer;
    public String dataEntryPerson;
    
    public String internalNotes;
    
    public Boolean hideFromMap;
    
    
    
    
}
