package com.government.subsidy.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "workflow_stages")
@Getter
@Setter
public class WorkflowStage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stageId;

    private String stageName;
    private Integer stageOrder;
    private String description;
}