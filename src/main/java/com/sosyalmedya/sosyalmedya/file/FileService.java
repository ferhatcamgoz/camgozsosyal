package com.sosyalmedya.sosyalmedya.file;

import com.sosyalmedya.sosyalmedya.config.AppConfig;
import com.sosyalmedya.sosyalmedya.message.Message;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@RequiredArgsConstructor
@EnableScheduling
public class FileService {

    @Autowired
    AppConfig appConfig;

    Tika tika = new Tika();

    @Autowired
    FileRepository fileRepository;


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

    public FileAttactment saveFile(MultipartFile multipartFile) {
        String fileName=generateRandomString();
        File target =new File(appConfig.getUploadPath()+"/"+fileName);
        OutputStream outputStream = null;
        try {
            outputStream = new FileOutputStream(target);
            outputStream.write(multipartFile.getBytes());
            outputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        FileAttactment file = new FileAttactment();
        file.setName(fileName);
        file.setDate(new Date());
       return fileRepository.save(file);




    }
    @Scheduled(fixedRate = 24*60*60*1000)
    public void cleanUpStroge(){
        Date date = new Date(System.currentTimeMillis()-24*60*60*1000);
        List<FileAttactment> messageList = fileRepository.findByDateBeforeAndMessageIsNull(date);
        for (FileAttactment message:messageList){
            deleteFile(message.getName());
            fileRepository.deleteById(message.getId());
        }
    }
}
