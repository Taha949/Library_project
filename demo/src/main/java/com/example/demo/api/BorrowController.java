package com.example.demo.api;

import com.example.demo.impl.BorrowService;
import com.example.demo.persistence.entity.Borrow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/borrows")
public class BorrowController {

    @Autowired
    private BorrowService borrowService;

    @GetMapping
    public List<Borrow> getAllBorrows() {
        return borrowService.findAllBorrows();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Borrow> getBorrowById(@PathVariable Long id) {
        Optional<Borrow> borrow = borrowService.findBorrowById(id);
        return borrow.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Borrow> createBorrow(@RequestBody Borrow borrow) {
        Borrow newBorrow = borrowService.saveBorrow(borrow);
        return ResponseEntity.ok(newBorrow);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBorrow(@PathVariable Long id) {
        borrowService.deleteBorrow(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<Borrow> updateBorrow(@PathVariable Long id, @RequestBody Borrow updatedBorrow) {
        Optional<Borrow> existingBorrow = borrowService.findBorrowById(id);
        if (existingBorrow.isPresent()) {
            Borrow borrow = existingBorrow.get();
            borrow.setReturnDate(updatedBorrow.getReturnDate());
            Borrow savedBorrow = borrowService.saveBorrow(borrow);
            return ResponseEntity.ok(savedBorrow);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
