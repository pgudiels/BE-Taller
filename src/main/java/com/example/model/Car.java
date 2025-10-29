package com.example.model;

import jakarta.validation.constraints.NotBlank;

public class Car {
  private Long id;
  @NotBlank
  private String brand;
  @NotBlank
  private String model;

  public Car() {}
  public Car(Long id, String brand, String model) {
    this.id = id;
    this.brand = brand;
    this.model = model;
  }
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getBrand() { return brand; }
  public void setBrand(String brand) { this.brand = brand; }
  public String getModel() { return model; }
  public void setModel(String model) { this.model = model; }
}