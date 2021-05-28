package com.sosyalmedya.sosyalmedya.file;

import com.sosyalmedya.sosyalmedya.config.AppConfig;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.tika.Tika;
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
@AllArgsConstructor
@RequiredArgsConstructor
public class FileService {

    @Autowired
    AppConfig appConfig;

    Tika tika = new Tika();


    public String writeBase64EncodedFile(String image) throws IOException {

        if(image!=null){
            String fileName=generateRandomString();
            File target =new File(appConfig.getUploadPath()+"/"+fileName);
            OutputStream outputStream = new FileOutputStream(target);
            byte[]base64encoded = Base64.getDecoder().decode(image);


            outputStream.write(base64encoded);
            outputStream.close();
            return fileName;
        }
        else {
            return null;
        }


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

    public String fileType(String value) {
        Tika tika = new Tika();
        byte[]base64encoded = Base64.getDecoder().decode(value);

        return tika.detect(base64encoded);

    }
}
