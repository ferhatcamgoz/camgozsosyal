package com.sosyalmedya.sosyalmedya.file;

import com.sosyalmedya.sosyalmedya.config.AppConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
public class FileService {

    @Autowired
    AppConfig appConfig;

    public String writeBase64EncodedFile(String image) throws IOException {
        String fileName=generateRandomString();
        File target =new File(appConfig.getUploadPath()+"/"+fileName);
        OutputStream outputStream = new FileOutputStream(target);
        byte[]base64encoded = Base64.getDecoder().decode(image);
        outputStream.write(base64encoded);
        outputStream.close();
        return fileName;
    }
    public void deleteFile(String image){
        if(image==null){
            return;
        }
        try {
            Files.deleteIfExists((Paths.get(appConfig.getUploadPath(),image)));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public String generateRandomString(){
        return UUID.randomUUID().toString().replaceAll("-","");
    }
}
