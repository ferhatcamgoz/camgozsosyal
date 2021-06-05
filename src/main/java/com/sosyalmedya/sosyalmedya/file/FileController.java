package com.sosyalmedya.sosyalmedya.file;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Collections;

@RestController
public class FileController {

    @Autowired
    FileService fileService;

    @PostMapping("/message-file")
    FileAttactment saveFile(MultipartFile image){
        return  fileService.saveFile(image);

    }
}
