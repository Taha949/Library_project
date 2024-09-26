package com.example.demo.impl;

import com.example.demo.persistence.entity.Borrow;
import com.example.demo.persistence.repository.BorrowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BorrowService {

    @Autowired
    private BorrowRepository borrowRepository;

    public List<Borrow> findAllBorrows() {
        return borrowRepository.findAll();
    }

    public Optional<Borrow> findBorrowById(Long id) {
        return borrowRepository.findById(id);
    }

    public Borrow saveBorrow(Borrow borrow) {
        return borrowRepository.save(borrow);
    }

    public void deleteBorrow(Long id) {
        borrowRepository.deleteById(id);
    }
}
