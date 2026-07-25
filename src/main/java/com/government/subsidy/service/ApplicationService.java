package com.government.subsidy.service;

import com.government.subsidy.exception.ResourceNotFoundException;
import com.government.subsidy.model.Application;
import com.government.subsidy.model.ApplicationStatus;
import com.government.subsidy.repository.ApplicationRepository;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ApplicationService {
    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Application getApplicationById(@NonNull Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id " + id));
    }

    @Transactional
    public Application submitApplication(Application application) {
        application.setStatus(ApplicationStatus.SUBMITTED);
        return applicationRepository.save(application);
    }

    @Transactional
    public Application updateApplicationStatus(@NonNull Long id, ApplicationStatus status, String remarks) {
        Application app = getApplicationById(id);
        app.setStatus(status);
        if (remarks != null) {
            app.setRemarks(remarks);
        }
        return applicationRepository.save(app);
    }
}
