package com.sosyalmedya.sosyalmedya.file;

import lombok.Data;

@Data
public class FileAttactmentDTO {
    private String name;

    private String fileType;

   public FileAttactmentDTO(FileAttactment fileAttactment ){
        this.setName(fileAttactment.getName());
        this.fileType=fileAttactment.getFileType();
   }
}
