package com.government.subsidy.service;

import com.government.subsidy.model.Scheme;
import com.government.subsidy.repository.SchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SchemeService {
    @Autowired
    private SchemeRepository schemeRepository;

    public List<Scheme> getAllSchemes() {
        return schemeRepository.findAll();
    }

    public Optional<Scheme> getSchemeById(Long id) {
        return schemeRepository.findById(id);
    }

    public Scheme createScheme(Scheme scheme) {
        return schemeRepository.save(scheme);
    }

    public Scheme updateScheme(Long id, Scheme schemeDetails) {
        return schemeRepository.findById(id).map(scheme -> {
            scheme.setName(schemeDetails.getName());
            scheme.setDescription(schemeDetails.getDescription());
            scheme.setEligibilityCriteria(schemeDetails.getEligibilityCriteria());
            scheme.setBudget(schemeDetails.getBudget());
            scheme.setActive(schemeDetails.isActive());
            return schemeRepository.save(scheme);
        }).orElseThrow(() -> new RuntimeException("Scheme not found with id " + id));
    }

    public void deleteScheme(Long id) {
        schemeRepository.deleteById(id);
    }
}
