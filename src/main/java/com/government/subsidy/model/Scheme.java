package com.government.subsidy.model;

import jakarta.persistence.*;

@Entity
@Table(name = "schemes")
public class Scheme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String eligibilityCriteria;

    private Double budget;

    @Column(nullable = false)
    private boolean active = true;

    public Scheme() {}

    public Scheme(Long id, String name, String description, String eligibilityCriteria, Double budget, boolean active) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.eligibilityCriteria = eligibilityCriteria;
        this.budget = budget;
        this.active = active;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getEligibilityCriteria() { return eligibilityCriteria; }
    public void setEligibilityCriteria(String eligibilityCriteria) { this.eligibilityCriteria = eligibilityCriteria; }

    public Double getBudget() { return budget; }
    public void setBudget(Double budget) { this.budget = budget; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
