package com.sosyalmedya.sosyalmedya.user;

import javax.validation.Constraint;
import javax.validation.Payload;

import java.lang.annotation.*;

@Target({ ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(
        validatedBy = {UniqeUserNameValidator.class}
)
public @interface UniqeUserName {
    String message() default "Kullanıcı adı uniqe olmalı";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default{};
}
