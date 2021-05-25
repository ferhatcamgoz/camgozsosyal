package com.sosyalmedya.sosyalmedya.file;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Base64;
import java.util.UUID;

@Service
public class FileService {
    public String writeBase64EncodedFile(String image) throws IOException {
        String fileName=generateRandomString();
        File target =new File("picture-stroge/"+fileName);
        OutputStream outputStream = new FileOutputStream(target);
        byte[]base64encoded = Base64.getDecoder().decode(image);

        return fileName;
    }
    public String generateRandomString(){
        return UUID.randomUUID().toString().replaceAll("-","");
    }
}
