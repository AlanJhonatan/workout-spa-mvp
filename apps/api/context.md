# Backend API Overview

An RESTFULL Api Server for our application.


# Stack
- Express
- Typescript
- Tsyringe (for Dependency Injection)
- Drizzle ORM
- zod (for validations)
- swagger for api documentation


# About the Architecture

This backend architecture use mainly these principles/concepts
- SOLID
- Clean Architecture
- Rich Entity

# Folder Structure

- domain (for all interfaces)
- infrastructure (for all implementations)
- application (for the usecases implementations)

# Pattern of an request

payload -> controller -> usecase -> repository/provider/service -> database/external service

## Rules for each layer

UseCase
- should orchestrate the dependencies and the business rules

Repository
- should deal with the persistence methods

Provider
- should deal with external services

Service
- should deal with internal services


# Entities

Basically the Diet part is composed by 2 entities:
- Food
- Meal

The Meal is made of `n` foods with repective grams.

Food Entity
- id (uniq string uuid)
- name (string)
- calories (number)
- carbohydrates (number)
- protein (number)
- fat (number)
- createdAt (string datetime)
- lastUpdate (string datetime)
(in the future more nutritional infos)

Meal Entity
- id (uniq string uuid)
- name
- mealFoods (MealFood [])
- createdAt
- lastUpdate

MealFood Entity
- id (uniq string uuid)
- mealId (Meal uuid)
- foodId (Food uuid)
- grams (number)
- createdAt (string datetime)