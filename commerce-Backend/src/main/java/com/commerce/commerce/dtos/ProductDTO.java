package com.commerce.commerce.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO implements Serializable {
    private static final long serialVersionUID = 123457L;

    private Integer id;
    private String name;
    private Integer categoryId;
    private String description;
    private Integer price;
    private String status;

    public Integer getId () {
        return id;
    }

    public void setId (Integer id) {
        this.id = id;
    }

    public String getName () {
        return name;
    }

    public void setName (String name) {
        this.name = name;
    }

    public Integer getCategoryId () {
        return categoryId;
    }

    public void setCategoryId (Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getDescription () {
        return description;
    }

    public void setDescription (String description) {
        this.description = description;
    }

    public Integer getPrice () {
        return price;
    }

    public void setPrice (Integer price) {
        this.price = price;
    }

    public String getStatus () {
        return status;
    }

    public void setStatus (String status) {
        this.status = status;
    }
}