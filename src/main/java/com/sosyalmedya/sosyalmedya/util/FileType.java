package com.sosyalmedya.sosyalmedya.util;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(
        validatedBy = {FileTypeValidator.class}
)
public @interface FileType {
    String message() default "{filetype.valide}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default{};

    String[]types();
}
