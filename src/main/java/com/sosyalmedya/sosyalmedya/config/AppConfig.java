package com.sosyalmedya.sosyalmedya.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "sosyal")
public class AppConfig {

    private String uploadPath;

    private String profileStroge ="profile";

    private String attachmentStroge="attachments";

    public String getProfileStroge(){
        return uploadPath+"/"+profileStroge;

    }
    public String getAttachmentsStroge(){
        return uploadPath+"/"+attachmentStroge;

    }
}
