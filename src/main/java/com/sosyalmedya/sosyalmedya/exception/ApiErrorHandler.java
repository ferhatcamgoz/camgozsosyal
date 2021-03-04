package com.sosyalmedya.sosyalmedya.exception;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
     public class ApiErrorHandler  implements ErrorController {
    @Autowired
    ErrorAttributes errorAttributes;
        @RequestMapping("/error")
        Apiexception handleError(WebRequest webRequest){
            Map<String, Object> att=   this.errorAttributes.getErrorAttributes(webRequest, ErrorAttributeOptions.of(ErrorAttributeOptions.Include.MESSAGE, ErrorAttributeOptions.Include.BINDING_ERRORS));
            String message= (String) att.get("message");
            String path = (String) att.get("path");
            int status = (Integer) att.get("status");
            Apiexception apiexception= new Apiexception(status,message,path);
            if(att.containsKey("errors")){
                List<FieldError> fieldErrorList = (List<FieldError>) att.get("errors");
                Map<String, String > validasonError= new HashMap<>();
                for(FieldError fieldError:fieldErrorList){
                    validasonError.put(fieldError.getField(),fieldError.getDefaultMessage());

                }
                apiexception.setValidateexception(validasonError);

            }
            return apiexception;
    }


    @Override
    public String getErrorPath() {
        return "/error";
    }
}
