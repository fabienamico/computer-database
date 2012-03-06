package controllers;

import static play.libs.Json.toJson;

import java.util.List;

import models.Computer;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;

import play.mvc.Controller;
import play.mvc.Result;

import views.html.index;

/**
 * Manage a database of computers
 */
public class Application extends Controller {
    
    public static Result index() {
    	return ok(index.render());
    }

    
    public static Result list() {
    	System.out.println("List : Controller");
    	List<Computer> computers = Computer.find.all();
    	System.out.println("nb computers : " + computers.size());
        return ok(toJson(computers));
    }
    
    public static Result save(){
    	System.out.println("Save : Controller");
    	JsonNode json = request().body().asJson();
    	ObjectMapper mapper = new ObjectMapper();
    	Computer computer = null;
    	try {
			
    		computer = mapper.readValue(json, Computer.class);
    		computer.save();
    		    		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return internalServerError();
		} 
		
		return ok(toJson(computer));
    }
    
    public static Result update(Long id){
    	System.out.println("Update : Controller");
    	JsonNode json = request().body().asJson();
    	ObjectMapper mapper = new ObjectMapper();
    	try {
			
    		Computer computer = mapper.readValue(json, Computer.class);
    		computer.update();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return internalServerError();
		} 
		
		return ok();
    }
    
    public static Result delete(Long id){
    	System.out.println("Remove");
    	Computer.find.byId(id).delete();
    	return ok();
    }
    
    public static Result get(Long id){
    	Computer computer = Computer.find.byId(id);
		System.out.println("Get Computer : " + computer.id);
		return ok(toJson(computer));
    }
 

}
            
