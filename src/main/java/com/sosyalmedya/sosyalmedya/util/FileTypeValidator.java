package com.sosyalmedya.sosyalmedya.util;

import com.sosyalmedya.sosyalmedya.file.FileService;
import org.hibernate.validator.constraintvalidation.HibernateConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;
import java.util.stream.Collectors;

public class FileTypeValidator implements ConstraintValidator<FileType,String> {
    @Autowired
    FileService fileService;
    String[]types;
    @Override
    public void initialize(FileType constraintAnnotation) {
        this.types=constraintAnnotation.types();

    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value==null||value.isEmpty()){
            return true;
        }
        String fileType=fileService.fileType(value);
        System.out.println(fileType);
        String [] tik = fileType.split("/");
        for(String t :types){
           /* if(fileType.contains(t)){
                System.out.println(t);
                return true;
            }*/
            System.out.println(t);
            if(t.equalsIgnoreCase(tik[1])) return true;
        }
        String supportedTypes = Arrays.stream(this.types).collect(Collectors.joining(","));
        HibernateConstraintValidatorContext hibernateConstraintValidatorContext = context.unwrap(HibernateConstraintValidatorContext.class);
        hibernateConstraintValidatorContext.addMessageParameter("types",supportedTypes);
        hibernateConstraintValidatorContext.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate()).addConstraintViolation();
        return false;
    }
}
