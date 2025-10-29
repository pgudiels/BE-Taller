package com.example.web;

import com.example.model.Car;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/cars")
public class CarController {
  private final Map<Long, Car> store = new LinkedHashMap<>();
  private final AtomicLong seq = new AtomicLong(1);

  @GetMapping
  public List<Car> list() {
    return new ArrayList<>(store.values());
  }

  @PostMapping
  public ResponseEntity<Car> create(@Valid @RequestBody Car car) {
    long id = seq.getAndIncrement();
    car.setId(id);
    store.put(id, car);
    return ResponseEntity.ok(car);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Car> get(@PathVariable Long id) {
    Car car = store.get(id);
    return car != null ? ResponseEntity.ok(car) : ResponseEntity.notFound().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<Car> update(@PathVariable Long id, @Valid @RequestBody Car car) {
    if (!store.containsKey(id)) return ResponseEntity.notFound().build();
    car.setId(id);
    store.put(id, car);
    return ResponseEntity.ok(car);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    return store.remove(id) != null ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
  }
}