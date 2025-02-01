package dev.webecke.powellstats.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record CurrentConditions(
        String lakeId,
        LocalDateTime timeOfCollection,
        LocalDate date,
        float currentLevel,
        float oneDayChange,
        float twoWeekChange,
        float oneYearChange,
        float differenceFromTenYearAverage,
        String debugInfo
) {}
