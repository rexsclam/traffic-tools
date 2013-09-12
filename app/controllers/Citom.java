package controllers;

import static akka.pattern.Patterns.ask;
import akka.actor.*;
import akka.dispatch.Future;
import akka.dispatch.OnSuccess;
import au.com.bytecode.opencsv.CSVWriter;
import gov.sandia.cognition.math.matrix.Vector;
import gov.sandia.cognition.math.matrix.VectorFactory;
import play.*;
import play.db.jpa.JPA;
import play.mvc.*;
import utils.DateUtils;

import java.awt.Color;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.persistence.Query;

import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.*;

import org.apache.commons.lang.StringUtils;
import org.geotools.geometry.jts.JTS;
import org.opengis.referencing.operation.MathTransform;
import org.opentripplanner.routing.graph.Edge;

import com.google.common.collect.Maps;
import com.google.common.collect.Multimap;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.LineString;

import jobs.ObservationHandler;

import models.*;
import api.*;

@With(Secure.class)
public class Citom extends Controller {

	private static ObjectMapper mapper = new ObjectMapper(); //.configure(SerializationConfig.Feature.WRITE_DATES_AS_TIMESTAMPS, false);
	private static JsonFactory jf = new JsonFactory();

//	public static final SimpleDateFormat sdf = new SimpleDateFormat(
//		     "MM/dd/yyyy HH:mm:ss");

	private static String toJson(Object pojo, boolean prettyPrint)
    throws JsonMappingException, JsonGenerationException, IOException {
        StringWriter sw = new StringWriter();
        JsonGenerator jg = jf.createJsonGenerator(sw);
        if (prettyPrint) {
            jg.useDefaultPrettyPrinter();
        }
        mapper.writeValue(jg, pojo);
        return sw.toString();
    }
	
	@Before
    static void setConnectedUser() {
        if(Security.isConnected() && Security.check("citom")) {
            renderArgs.put("user", Security.connected());
        }
        else
        	Application.index();
    }
	
	public static void index() {
		render();
	}	
	
	public static void incidents() {
		render();
	}
	
	public static void journey() {
		
		List<Journey> saveJourneys = Journey.findAll();
		
		render(saveJourneys);
	}
	
	public static void area() {
		render();
	}
	
	public static void saveJourney(String name, Double originLat, Double originLon, Double destinationLat, Double destinationLon, Double speed, Double distance, Double time) {
		
		Journey journey = new Journey();
		
		journey.name = name;
		journey.originLat = originLat;
		journey.originLon = originLon;
		journey.destinationLat = destinationLat;
		journey.destinationLon = destinationLon;
		journey.speed = speed;
		journey.distance = distance;
		journey.time = time;
	
		journey.account = Security.getAccount();
		
		journey.save();
		
		Citom.journey();
	}
	
	public static void clearJourney(Long id) {
		
		Journey journey = Journey.findById(id);
	
		journey.delete();
		
		Citom.journey();
	}
	
	public static void alerts(String fromDate, String toDate, String type, String query, Boolean active, Boolean csv) {
		
		List<Alert> alerts = null;
		
		Date from = new Date();
		Date to = new Date();
		
		
		/*if(filter == null || filter.isEmpty() || filter.equals("today"))
		{
			Calendar cal = Calendar.getInstance();
			cal.add(Calendar.HOUR, -24);
			from = cal.getTime();
		}
		else if(filter.equals("yesterday"))
		{
			Calendar cal = Calendar.getInstance();
			cal.add(Calendar.HOUR, -24);
			to = cal.getTime();
			
			cal = Calendar.getInstance();
			cal.add(Calendar.HOUR, -48);
			from = cal.getTime();
			
		}
		else if(filter.equals("week"))
		{
			Calendar cal = Calendar.getInstance();
			cal.add(Calendar.HOUR, -168);
			from = cal.getTime();
		}
		else if(filter.equals("custom"))
		{	
			
		}
		else
		{
			Calendar cal = Calendar.getInstance();
			cal.add(Calendar.HOUR, -24);
			from = cal.getTime();
		}*/

		try
		{
			if(active != null && active) {
				from = DateUtils.parseDisplay(fromDate + " 00:00:01");
				to = DateUtils.parseDisplay(toDate + " 23:59:59");
			}
			else {
				Calendar date = new GregorianCalendar();
				// reset hour, minutes, seconds and millis
				date.set(Calendar.HOUR_OF_DAY, 0);
				date.set(Calendar.MINUTE, 0);
				date.set(Calendar.SECOND, 0);
				date.set(Calendar.MILLISECOND, 0);

				// next day
				date.add(Calendar.DAY_OF_MONTH, 1);
				to = date.getTime();
			}
		}
		catch(Exception e)
		{
			Logger.info(e.toString());
		}
		
		if(active != null && active)
		{
			if(query != null && !query.isEmpty())
			{
				query = "%" +  query.toLowerCase() + "%";

				if(type != null && !type.isEmpty())
					alerts = Alert.find("(lower(generalDescription) like ? or lower(locationDescription) like ? or lower(title) like ?) and activeTo is null and type = ?", query, query, query, type).fetch();
				else
					alerts = Alert.find("(lower(generalDescription) like ? or lower(locationDescription) like ? or lower(title) like ?) and activeTo is null ", query, query, query).fetch();
			}
			else
			{
				if(type != null && !type.isEmpty()) 
					alerts = Alert.find("activeTo is null  and type = ?", type).fetch();
				else
					alerts = Alert.find("activeTo is null").fetch();
			}
		}
		else
		{
			if(query != null && !query.isEmpty())
			{
				query = "%" +  query.toLowerCase() + "%";

				if(type != null && !type.isEmpty())
					alerts = Alert.find("(lower(generalDescription) like ? or lower(locationDescription) like ? or lower(title) like ?) or (activeFrom >= ? and (activeTo <= ? or activeTo is null)) and type = ?", query, query, query, from, to, type).fetch();
				else
					alerts = Alert.find("(lower(generalDescription) like ? or lower(locationDescription) like ? or lower(title) like ?) orctiveFrom >= ? and (activeTo <= ? or activeTo is null)) ", query, query, query, from, to).fetch();
			}
			else
			{
				if(type != null && !type.isEmpty()) 
					alerts = Alert.find("((activeFrom >= ? and activeFrom <= ?) or (activeTo <= ? and activeTo >= ?) or  (activeFrom <= ? and activeTo is null)) and type = ?", from, to, to, from, from, type).fetch();
				else
					alerts = Alert.find("((activeFrom >= ? and activeFrom <= ?) or (activeTo <= ? and activeTo >= ?) or (activeFrom <= ? and activeTo is null)) ", from, to, to, from, from).fetch();
			}
		}
		
		ArrayList<AlertSimple> data = new ArrayList<AlertSimple>();

		for(Alert alert : alerts)
		{
			data.add(new AlertSimple(alert, true));
		}
	
		if(request.format == "xml")
			renderXml(data);
		else if(csv != null && csv)
		{

			StringWriter csvString = new StringWriter();
			CSVWriter csvWriter = new CSVWriter(csvString);
			
			String[] headerBase = "user,title,type,publiclyVisible,generalDescription,locationDescription,lat,lon,activeFrom,activeTo,mode1,mode2,mode3,mode4,person1age,person1gender,person1injury,person2age,person2gender,person2injury,person3age,person3gender,person3injury,person4age,person4gender,person4injury,totalInjuries,totalFatalities,logBook,hitRun,weather,trafficEnforcer,dataEntryPerson,internalNotes,hideFromMap".split(",");
			
			csvWriter.writeNext(headerBase);
			 
			for(Alert alert : alerts)
			{
				String[] dataFields = new String[35];
				dataFields[0] = alert.account.username;
				if(alert.title != null)
					dataFields[1] = alert.title;
				else
					dataFields[1] = "";
				dataFields[2] = alert.type;
				
				if (alert.publiclyVisible != null)
					dataFields[3] = alert.publiclyVisible.toString();
				else
					dataFields[3] = "";
				if(alert.generalDescription != null)
					dataFields[4] = alert.generalDescription;
				else
					dataFields[4] = "";
				if(alert.locationDescription != null)
					dataFields[5] = alert.locationDescription;
				else
					dataFields[5] = "";
				dataFields[6] = alert.locationLat.toString();
				dataFields[7] = alert.locationLon.toString();
				dataFields[8] = alert.activeFrom.toString();
				if(alert.activeTo != null)
					dataFields[9] = alert.activeTo.toString();
				else
					dataFields[9] = "";
				dataFields[10] = alert.mode1;
				dataFields[11] = alert.mode2;
				dataFields[12] = alert.mode3;
				dataFields[13] = alert.mode4;
				dataFields[14] = alert.person1age;
				dataFields[15] = alert.person1gender;
				dataFields[16] = alert.person1injury;
				dataFields[17] = alert.person2age;
				dataFields[18] = alert.person2gender;
				dataFields[19] = alert.person2injury;
				dataFields[20] = alert.person3age;
				dataFields[21] = alert.person3gender;
				dataFields[22] = alert.person3injury;
				dataFields[23] = alert.person4age;
				dataFields[24] = alert.person4gender;
				dataFields[25] = alert.person4injury;
				if(alert.totalInjuries != null)
					dataFields[26] = alert.totalInjuries;
				else
					dataFields[26] = "";
				if(alert.totalFatalities != null)
					dataFields[27] = alert.totalFatalities;
				else
					dataFields[27] = "";
				if(alert.logBook != null)
					dataFields[28] = alert.logBook;
				else
					dataFields[28] = "";
				dataFields[29] = alert.hitRun;
				dataFields[30] = alert.weather;
				if(alert.trafficEnforcer != null)
					dataFields[31] = alert.trafficEnforcer;
				else
					dataFields[31] = "";
				if(alert.dataEntryPerson != null)
					dataFields[32] = alert.dataEntryPerson;
				else
					dataFields[32] = "";
				if(alert.internalNotes != null)
					dataFields[33] = alert.internalNotes;
				else
					dataFields[33] = "";
				if(alert.hideFromMap != null)
					dataFields[34] = alert.hideFromMap.toString();
				else
					dataFields[34] = "";
				
				csvWriter.writeNext(dataFields);
				
				List<AlertMessage> messages = AlertMessage.find("alert = ?", alert).fetch();
				
				for(AlertMessage message : messages)
				{
					String[] messageFields = new String[7];
					
					messageFields[0] = "-";
					messageFields[1] = "message";
					messageFields[2] = message.messageText;
					messageFields[3] = "timestamp";
					messageFields[4] = message.timestamp.toString();
					messageFields[5] = "by";
					messageFields[6] = message.account.username;
					
					
					csvWriter.writeNext(messageFields);
				}
			
			}
			
			response.setHeader("Content-Disposition", "attachment; filename=\"alert_data.csv\"");
			response.setHeader("Content-type", "text/csv");
			
			renderText(csvString);
		}
		else
		{
			try
			{
				renderJSON(mapper.writeValueAsString(data));
			}
			catch (Exception e) {
	            e.printStackTrace();
	            badRequest();
	        }
		}
	}
	
	
public static void alertsCsv(Boolean active, String filter, String fromDate, String toDate, String type) {
		
		/*List<Alert> alerts = null;
		
		Date from = new Date();
		Date to = new Date();
		
		
		if(filter == null || filter.isEmpty() || filter.equals("today"))
		{
			Calendar cal = Calendar.getInstance();
			cal.add(Calendar.HOUR, -24);
			from = cal.getTime();
		}
		else if(filter.equals("yesterday"))
		{
			Calendar cal = Calendar.getInstance();
			cal.add(Calendar.HOUR, -24);
			to = cal.getTime();
			
			cal = Calendar.getInstance();
			cal.add(Calendar.HOUR, -48);
			from = cal.getTime();
			
		}
		else if(filter.equals("week"))
		{
			Calendar cal = Calendar.getInstance();
			cal.add(Calendar.HOUR, -168);
			from = cal.getTime();
		}
		else if(filter.equals("custom"))
		{	
			try
			{
				from = Citom.sdf.parse(fromDate + " 00:00:01");
				to = Citom.sdf.parse(toDate + " 23:59:59");
			}
			catch(Exception e)
			{
				Logger.info(e.toString());
			}
		}
		else
		{
			Calendar cal = Calendar.getInstance();
			cal.add(Calendar.HOUR, -24);
			from = cal.getTime();
		}
		
		if(active != null && active)
		{
			if(type != null && !type.isEmpty())
				alerts = Alert.find("active = true and timestamp >= ? and timestamp <= ? and type = ? order by timestamp", from, to, type).fetch();
			else
				alerts = Alert.find("active = true and timestamp >= ? and timestamp <= ? order by timestamp", from, to).fetch();
		}
		else
		{
			if(type != null && !type.isEmpty())
				alerts = Alert.find("timestamp >= ? and timestamp <= ? and type = ? order by timestamp", from, to, type).fetch();
			else
				alerts = Alert.find("timestamp >= ? and timestamp <= ? order by timestamp", from, to).fetch();
		}
		
		StringWriter csvString = new StringWriter();
		CSVWriter csvWriter = new CSVWriter(csvString);
		
		String[] headerBase = "type, timestamp, user, active, description, lat, lon".split(",");
		
		csvWriter.writeNext(headerBase);
		 
		for(Alert alert : alerts)
		{
			String[] dataFields = new String[7];
			dataFields[0] = alert.type;
			dataFields[1] = alert.timestamp.toString();
			dataFields[2] = alert.account.username;
			dataFields[3] = alert.active.toString();
			dataFields[4] = alert.description;
			dataFields[5] = alert.locationLat.toString();
			dataFields[6] = alert.locationLon.toString();
			
			csvWriter.writeNext(dataFields);
			
			List<AlertMessage> messages = AlertMessage.find("alert = ?", alert).fetch();
			
			for(AlertMessage message : messages)
			{
				String[] messageFields = new String[7];
				
				messageFields[0] = "-";
				messageFields[1] = message.timestamp.toString();
				messageFields[2] = message.account.username;
				messageFields[4] = message.description;
				
				csvWriter.writeNext(messageFields);
			}
			
			
		}
		
		response.setHeader("Content-Disposition", "attachment; filename=\"alert_data.csv\"");
		response.setHeader("Content-type", "text/csv");*/
		
		renderText("");
	}
	
	
	public static void alertMessages(Long id) {
		
		Alert alert = Alert.findById(id);
		
		List<AlertMessage> messages = AlertMessage.find("alert = ?", alert).fetch();
		
		if(request.format == "xml")
			renderXml(messages);
		else
			renderJSON(messages);
	}
	
	
	public static void saveAlertMessage(Long id, String message) {
		
		Alert alert = Alert.findById(id);
		
		if(alert == null)
			badRequest();

		AlertMessage newMessage = new AlertMessage();
		newMessage.alert = alert;
		newMessage.messageText = message;
		newMessage.timestamp = new Date();
		newMessage.account = Security.getAccount();
		newMessage.save();
		
		ok();
	}
	
	
	public static void clearAlert(Long id) {
		
		Alert alert = Alert.findById(id);
		
		//alert.active = false;
		alert.activeTo = new Date();
		alert.save();
		
		ok();
	}
	
	public static void createAlert() {
		
		AlertSimple alert;
		
		Phone.updateAlerts();

        try {
        	alert = mapper.readValue(params.get("body"), AlertSimple.class);

            Alert newAlert = new Alert();
            newAlert.account = Security.getAccount();
            newAlert.title = alert.title;
            newAlert.type = alert.type;
            newAlert.publiclyVisible = alert.publiclyVisible;
            newAlert.generalDescription = alert.generalDescription;
			newAlert.locationDescription = alert.locationDescription;
			newAlert.locationLat = alert.locationLat;
			newAlert.locationLon = alert.locationLon;
			newAlert.activeFrom = alert.activeFrom;
			newAlert.activeTo = alert.activeTo;
			newAlert.mode1 = alert.mode1;
			newAlert.mode2 = alert.mode2;
			newAlert.mode3 = alert.mode3;
			newAlert.mode4 = alert.mode4;
			newAlert.person1age = alert.person1age;
			newAlert.person1gender = alert.person1gender;
			newAlert.person1injury = alert.person1injury;
			newAlert.person2age = alert.person2age;
			newAlert.person2gender = alert.person2gender;
			newAlert.person2injury = alert.person2injury;
			newAlert.person3age = alert.person3age;
			newAlert.person3gender = alert.person3gender;
			newAlert.person3injury = alert.person3injury;
			newAlert.person4age = alert.person4age;
			newAlert.person4gender = alert.person4gender;
			newAlert.person4injury = alert.person4injury;
			newAlert.totalInjuries = alert.totalInjuries;
			newAlert.totalFatalities = alert.totalFatalities;
			newAlert.logBook = alert.logBook;
			newAlert.hitRun = alert.hitRun;
			newAlert.weather = alert.weather;
			newAlert.trafficEnforcer = alert.trafficEnforcer;
			newAlert.dataEntryPerson = alert.dataEntryPerson;
			newAlert.internalNotes = alert.internalNotes;
			newAlert.hideFromMap = alert.hideFromMap;
			
			
			
			
			newAlert.save();
			//ok();
            renderJSON(Citom.toJson(new AlertSimple(newAlert, true), false));

        } catch (Exception e) {
            e.printStackTrace();
            badRequest();
        }
		
	}

	public static void updateAlert() {
		
		AlertSimple alert;
		
		Phone.updateAlerts();

        try {
        	alert = mapper.readValue(params.get("body"), AlertSimple.class);

            if(alert.id == null)
                badRequest();

            Alert updatedAlert = Alert.findById(alert.id);
            
            updatedAlert.account = Security.getAccount();
            updatedAlert.title = alert.title;
            updatedAlert.type = alert.type;
            updatedAlert.publiclyVisible = alert.publiclyVisible;
            updatedAlert.generalDescription = alert.generalDescription;
			updatedAlert.locationDescription = alert.locationDescription;
			updatedAlert.locationLat = alert.locationLat;
			updatedAlert.locationLon = alert.locationLon;
			updatedAlert.activeFrom = alert.activeFrom;
			updatedAlert.activeTo = alert.activeTo;
			updatedAlert.mode1 = alert.mode1;
			updatedAlert.mode2 = alert.mode2;
			updatedAlert.mode3 = alert.mode3;
			updatedAlert.mode4 = alert.mode4;
			updatedAlert.person1age = alert.person1age;
			updatedAlert.person1gender = alert.person1gender;
			updatedAlert.person1injury = alert.person1injury;
			updatedAlert.person2age = alert.person2age;
			updatedAlert.person2gender = alert.person2gender;
			updatedAlert.person2injury = alert.person2injury;
			updatedAlert.person3age = alert.person3age;
			updatedAlert.person3gender = alert.person3gender;
			updatedAlert.person3injury = alert.person3injury;
			updatedAlert.person4age = alert.person4age;
			updatedAlert.person4gender = alert.person4gender;
			updatedAlert.person4injury = alert.person4injury;
			updatedAlert.totalInjuries = alert.totalInjuries;
			updatedAlert.totalFatalities = alert.totalFatalities;
			updatedAlert.logBook = alert.logBook;
			updatedAlert.hitRun = alert.hitRun;
			updatedAlert.weather = alert.weather;
			updatedAlert.trafficEnforcer = alert.trafficEnforcer;
			updatedAlert.dataEntryPerson = alert.dataEntryPerson;
			updatedAlert.internalNotes = alert.internalNotes;
			updatedAlert.hideFromMap = alert.hideFromMap;

			updatedAlert.save();
			
			ok();
            //renderJSON(Api.toJson(updatedAlert, false));
        } catch (Exception e) {
            e.printStackTrace();
            badRequest();
        }
		
	}

}